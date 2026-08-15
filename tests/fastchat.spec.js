import { describe, it, expect, vi } from 'vitest'
import { loadPet, mockCtx } from './helpers.js'

/** 用假 stream 构造 host ctx，直接执行 lib/index.js 的 apply。 */
async function loadHost(ctx) {
  const mod = await import('../lib/index.js')
  mod.apply(ctx)
  return ctx
}

describe('2级 fast-chat host 桥', () => {
  it('host 插件注入声明包含 connection 与 llm（cordis 代理对未注入服务会抛错）', async () => {
    const mod = await import('../lib/index.js')
    expect(mod.inject).toContain('connection')
    expect(mod.inject).toContain('llm')
  })

  it('host 注册 /bluewhale-pet 通道，fast-chat 调 ctx.llm.stream 并返回文本', async () => {
    let registered = null
    const chunks = [
      { type: 'text-delta', index: 0, text: '主人' },
      { type: 'text-delta', index: 0, text: '好呀～' },
      { type: 'finish', reason: { kind: 'stop' } },
    ]
    const stream = vi.fn(async function* () { yield* chunks })
    const ctx = {
      effect(fn) { return fn() },
      connection: { rpc: { handle: (channel, handler, options) => { registered = { channel, handler, options } } } },
      llm: { stream },
    }
    await loadHost(ctx)
    expect(registered).not.toBeNull()
    expect(registered.channel).toBe('/bluewhale-pet')

    const res = await registered.handler('fast-chat', { text: '你好' }, new AbortController().signal)
    expect(res.ok).toBe(true)
    expect(res.value.text).toBe('主人好呀～')
    expect(stream).toHaveBeenCalledTimes(1)
    const opts = stream.mock.calls[0][0]
    expect(opts.provider).toBe('deepseek-official')
    expect(opts.model).toBe('deepseek-chat')
    expect(opts.maxTokens).toBe(60)
    expect(opts.reasoningEffort).toBe('off')
    expect(opts.system).toContain('蓝鲸')
    expect(opts.messages[0].content[0]).toEqual({ type: 'text', text: '你好' })
  })

  it('llm 不可用返回错误结果', async () => {
    let handler = null
    const ctx = {
      effect(fn) { return fn() },
      connection: { rpc: { handle: (_c, h) => { handler = h } } },
      llm: undefined,
    }
    await loadHost(ctx)
    const res = await handler('fast-chat', { text: 'x' })
    expect(res.ok).toBe(false)
    expect(res.error).toMatchObject({
      code: 'model-unavailable',
      message: expect.any(String),
      details: { provider: 'deepseek-official', model: 'deepseek-chat' },
    })
  })

  it('注入声明包含 connection', () => {
    const { module } = loadPet()
    expect(module.inject).toContain('connection')
  })

  it('输入开放闲聊 → fast 路由 → 回复渲染进宠物对话 tab', async () => {
    const { dom, seam } = loadPet()
    const ctx = mockCtx({
      connection: { rpc: { call: async (channel, endpoint) => {
        expect(channel).toBe('/bluewhale-pet')
        expect(endpoint).toBe('fast-chat')
        return { ok: true, value: { text: '主人好呀～(๑•̀ㅂ•́)و✧' } }
      } } },
    })
    seam.apply(ctx)
    const doc = dom.window.document
    const input = doc.getElementById('dsh-pet-input')
    input.value = '今天天气不错，想出去走走'
    doc.getElementById('dsh-pet-send').click()
    await vi.waitFor(() => {
      const msgs = [...doc.querySelectorAll('#dsh-pet-chat .pc-msg')]
      expect(msgs.some((m) => m.textContent.includes('主人好呀～'))).toBe(true)
    })
  })

  it('模型错误以 finish 块返回 → internal（不回空文本）', async () => {
    let handler = null
    const stream = vi.fn(async function* () {
      yield { type: 'finish', reason: { kind: 'error', failure: { message: 'boom' } } }
    })
    const ctx = {
      effect(fn) { return fn() },
      connection: { rpc: { handle: (_c, h) => { handler = h } } },
      llm: { stream },
    }
    await loadHost(ctx)
    const res = await handler('fast-chat', { text: '你好' })
    expect(res.ok).toBe(false)
    expect(res.error).toMatchObject({ code: 'internal', details: {} })
    expect(stream).toHaveBeenCalledTimes(1)
  })

  it('bad-request：空白与超长文本', async () => {
    let handler = null
    const ctx = {
      effect(fn) { return fn() },
      connection: { rpc: { handle: (_c, h) => { handler = h } } },
      llm: { stream: vi.fn() },
    }
    await loadHost(ctx)
    expect((await handler('fast-chat', { text: '  ' })).error).toMatchObject({ code: 'bad-request', details: { issues: [] } })
    expect((await handler('fast-chat', { text: 'x'.repeat(2001) })).error).toMatchObject({ code: 'bad-request', details: { issues: [] } })
  })

  it('unknown-endpoint 返回错误码 → unknown-command', async () => {
    let handler = null
    const ctx = {
      effect(fn) { return fn() },
      connection: { rpc: { handle: (_c, h) => { handler = h } } },
      llm: { stream: vi.fn() },
    }
    await loadHost(ctx)
    expect((await handler('other', { text: 'x' })).error).toMatchObject({ code: 'unknown-command', details: {} })
  })

  it('finish aborted 块 → cancelled（线协议枚举码）', async () => {
    let handler = null
    const stream = vi.fn(async function* () {
      yield { type: 'finish', reason: { kind: 'aborted' } }
    })
    const ctx = {
      effect(fn) { return fn() },
      connection: { rpc: { handle: (_c, h) => { handler = h } } },
      llm: { stream },
    }
    await loadHost(ctx)
    const res = await handler('fast-chat', { text: '你好' })
    expect(res.error).toMatchObject({ code: 'cancelled', details: {} })
  })
})
