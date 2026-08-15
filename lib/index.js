/**
 * dsh-bluewhale-pet — host half.
 *
 * Registers the `/bluewhale-pet` logical RPC channel on the Connection
 * service and answers `fast-chat` with a one-shot non-reasoning call through
 * the host LlmRuntime (deepseek-chat, maxTokens 60). The browser half reaches
 * it via ctx.connection.rpc.call — the pet never touches API keys.
 */

/** @type {import('@deepseek-ai/cordis').Plugin} */
export const inject = ['connection']

const PET_SYSTEM_PROMPT = '请以"蓝鲸"（一只可爱的像素风蓝鲸宠物）的口吻简短回答，用中文，语气活泼可爱，可以加颜文字，回答控制在3句话以内。'

/**
 * @param ctx - host cordis context.
 */
export function apply(ctx) {
  ctx.effect(() => ctx.connection.rpc.handle('/bluewhale-pet', async (endpoint, payload, signal) => {
    if (endpoint !== 'fast-chat') {
      return { ok: false, error: { code: 'unknown-endpoint', message: 'unknown endpoint: ' + endpoint } }
    }
    const text = payload && typeof payload.text === 'string' ? payload.text.trim() : ''
    if (!text) return { ok: false, error: { code: 'bad-request', message: 'missing text' } }
    if (text.length > 2000) return { ok: false, error: { code: 'bad-request', message: 'text too long' } }
    let llm
    try { llm = ctx.llm } catch {}
    if (!llm) return { ok: false, error: { code: 'llm-unavailable', message: 'host LLM service unavailable' } }
    try {
      const parts = []
      let finish = null
      for await (const chunk of llm.stream({
        provider: 'deepseek-official',
        model: 'deepseek-chat',
        messages: [{
          id: globalThis.crypto.randomUUID(),
          role: 'user',
          content: [{ type: 'text', text }],
          source: { kind: 'plugin', plugin: 'dsh-bluewhale-pet' },
        }],
        system: PET_SYSTEM_PROMPT,
        maxTokens: 60,
        temperature: 1,
        signal,
      })) {
        if (chunk.type === 'text-delta') parts.push(chunk.text)
        if (chunk.type === 'finish') finish = chunk
      }
      if (finish && finish.reason && finish.reason.kind === 'error') {
        const msg = finish.reason.failure && finish.reason.failure.message ? finish.reason.failure.message : 'model request failed'
        return { ok: false, error: { code: 'llm-error', message: msg } }
      }
      if (finish && finish.reason && finish.reason.kind === 'aborted') {
        return { ok: false, error: { code: 'llm-aborted', message: 'model request aborted' } }
      }
      return { ok: true, value: { text: parts.join('') } }
    } catch (e) {
      return { ok: false, error: { code: 'llm-error', message: String(e && e.message ? e.message : e) } }
    }
  }, { authority: 'loopback' }))
}
