/**
 * dsh-bluewhale-pet — host half.
 *
 * Registers the `/bluewhale-pet` logical RPC channel on the Connection
 * service and answers `fast-chat` with a one-shot non-reasoning call through
 * the host LlmRuntime (deepseek-chat, maxTokens 60). The browser half reaches
 * it via ctx.connection.rpc.call — the pet never touches API keys.
 *
 * 错误码必须是 dsh-host-apiproxy rpc.schema.ts 的 rpcErrorSchema 枚举闭集，且 details 必填——自定义码会被传输层 zod 拒绝。
 */

/** @type {import('@deepseek-ai/cordis').Plugin} */
export const inject = ['connection', 'llm', 'web']

const PET_SYSTEM_PROMPT = '请以"蓝鲸"（一只可爱的像素风蓝鲸宠物）的口吻简短回答，用中文，语气活泼可爱，可以加颜文字，回答控制在3句话以内。'

/**
 * 流式收集 LLM 输出（fast-chat / lookup 共用）。
 * @returns {Promise<{ok: true, text: string} | {ok: false, code: string, message: string}>}
 */
async function streamText(llm, userText, maxTokens, signal) {
  try {
    const parts = []
    const chunkKinds = []
    let finish = null
    for await (const chunk of llm.stream({
      provider: 'deepseek-official',
      model: 'deepseek-chat',
      // 显式关闭思考：llm-deepseek 默认 effort=high（thinking enabled），
      // 60 token 预算会被 reasoning_content 全部吃掉导致空回复。
      reasoningEffort: 'off',
      messages: [{
        id: globalThis.crypto.randomUUID(),
        role: 'user',
        content: [{ type: 'text', text: userText }],
        source: { kind: 'plugin', plugin: 'dsh-bluewhale-pet', form: 'notice', summary: userText.slice(0, 120) },
      }],
      system: PET_SYSTEM_PROMPT,
      maxTokens,
      temperature: 1,
      signal,
    })) {
      chunkKinds.push(chunk.type)
      if (chunk.type === 'text-delta') parts.push(chunk.text)
      if (chunk.type === 'finish') finish = chunk
    }
    if (finish && finish.reason && finish.reason.kind === 'error') {
      const msg = finish.reason.failure && finish.reason.failure.message ? finish.reason.failure.message : 'model request failed'
      return { ok: false, code: 'internal', message: msg }
    }
    if (finish && finish.reason && finish.reason.kind === 'aborted') {
      return { ok: false, code: 'cancelled', message: 'model request aborted' }
    }
    const resultText = parts.join('')
    if (!resultText) {
      // 诊断：关思考后仍无可见文本时记录 chunk 构成，真机排查用
      console.warn('[dsh-bluewhale-pet] stream empty text, finish:', finish && finish.reason, 'chunkKinds:', chunkKinds.join(','))
    }
    return { ok: true, text: resultText }
  } catch (e) {
    return { ok: false, code: 'internal', message: String(e && e.message ? e.message : e) }
  }
}

/**
 * @param ctx - host cordis context.
 */
export function apply(ctx) {
  ctx.effect(() => ctx.connection.rpc.handle('/bluewhale-pet', async (endpoint, payload, signal) => {
    if (endpoint !== 'fast-chat' && endpoint !== 'lookup') {
      return { ok: false, error: { code: 'unknown-command', message: 'unknown endpoint: ' + endpoint, details: {} } }
    }
    const text = payload && typeof payload.text === 'string' ? payload.text.trim() : ''
    if (!text) return { ok: false, error: { code: 'bad-request', message: 'missing text', details: { issues: [] } } }
    if (text.length > 2000) return { ok: false, error: { code: 'bad-request', message: 'text too long', details: { issues: [] } } }
    let llm
    try { llm = ctx.llm } catch {}
    if (!llm) return { ok: false, error: { code: 'model-unavailable', message: 'host LLM service unavailable', details: { provider: 'deepseek-official', model: 'deepseek-chat' } } }
    if (endpoint === 'lookup') {
      let web
      try { web = ctx.web } catch {}
      if (!web) return { ok: false, error: { code: 'internal', message: 'web service unavailable', details: {} } }
      let searchResult
      try {
        searchResult = await web.search({ query: text, maxResults: 5 }, signal)
      } catch (e) {
        return { ok: false, error: { code: 'internal', message: 'web search failed: ' + String(e && e.message ? e.message : e), details: {} } }
      }
      if (!searchResult || typeof searchResult !== 'object') return { ok: false, error: { code: 'internal', message: 'web search returned unexpected result', details: {} } }
      const sources = (searchResult.sources || []).map((s) => (s.title || '') + (s.snippet ? '：' + s.snippet : '')).join('\n')
      const context = sources || searchResult.content || searchResult.answer || ''
      if (!context) return { ok: false, error: { code: 'internal', message: 'web search returned no results', details: {} } }
      const prompt = '以下是网络搜索结果。请以蓝鲸的口吻，用中文3句话以内回答用户的问题，可以加颜文字，内容要有信息量。\n用户问题：' + text + '\n搜索结果：\n' + context.slice(0, 2000)
      const res = await streamText(llm, prompt, 150, signal)
      if (!res.ok) return { ok: false, error: { code: res.code, message: res.message, details: {} } }
      return { ok: true, value: { text: res.text } }
    }
    const res = await streamText(llm, text, 60, signal)
    if (!res.ok) return { ok: false, error: { code: res.code, message: res.message, details: {} } }
    return { ok: true, value: { text: res.text } }
  }, { authority: 'loopback' }))
}
