import { describe, it, expect, vi } from 'vitest'
import { loadPet, mockCtx } from './helpers.js'

describe('数据飞轮', () => {
  it('logTurn 记录路由/耗时/结果，环形上限 200', () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const storage = dom.window.localStorage
    for (let i = 0; i < 205; i++) {
      seam.logTurn('你好' + i, { layer: 1, intent: 'greet' }, 1, true)
    }
    const logs = JSON.parse(storage.getItem('dsh-bluewhale:chatlog') || '[]')
    expect(logs.length).toBe(200)
    expect(logs[199].text).toBe('你好204')
    expect(logs[199]).toMatchObject({ layer: 1, intent: 'greet', ok: true, latency: 1 })
    expect(logs[199].t).toBeTypeOf('number')
    cleanup()
  })

  it('不向 DOM 添加任何 UI', () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    seam.logTurn('x', { layer: 1, intent: 'greet' }, 0, true)
    expect(dom.window.document.querySelectorAll('[data-telemetry]').length).toBe(0)
    cleanup()
  })

  it('真实聊天驱动 logTurn：1级问候落库', async () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    doc.getElementById('dsh-pet-input').value = '你好呀'
    doc.getElementById('dsh-pet-send').click()
    const logs = JSON.parse(dom.window.localStorage.getItem('dsh-bluewhale:chatlog') || '[]')
    expect(logs.length).toBe(1)
    expect(logs[0]).toMatchObject({ layer: 1, intent: 'greet', ok: true })
    cleanup()
  })

  it('真实聊天驱动 logTurn：2级失败记录 ok:false', async () => {
    const { dom, seam } = loadPet()
    // mockCtx 默认 connection.rpc.call 返回 ok:false → fastChat 抛错 → 失败路径
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    doc.getElementById('dsh-pet-input').value = '今天天气不错，想出去走走'
    doc.getElementById('dsh-pet-send').click()
    await vi.waitFor(() => {
      const logs = JSON.parse(dom.window.localStorage.getItem('dsh-bluewhale:chatlog') || '[]')
      expect(logs.length).toBe(1)
      expect(logs[0]).toMatchObject({ layer: 2, intent: 'fast', ok: false })
    })
    cleanup()
  })

  it('损坏 JSON 与非数组存量值兜底重置', () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const storage = dom.window.localStorage
    storage.setItem('dsh-bluewhale:chatlog', 'not json{{{')
    seam.logTurn('a', { layer: 1, intent: 'greet' }, 0, true)
    expect(JSON.parse(storage.getItem('dsh-bluewhale:chatlog') || '[]').length).toBe(1)
    storage.setItem('dsh-bluewhale:chatlog', JSON.stringify({ a: 1 }))
    seam.logTurn('b', { layer: 1, intent: 'greet' }, 0, true)
    expect(JSON.parse(storage.getItem('dsh-bluewhale:chatlog') || '[]').length).toBe(1)
    cleanup()
  })
})
