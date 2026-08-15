import { describe, it, expect } from 'vitest'
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
})
