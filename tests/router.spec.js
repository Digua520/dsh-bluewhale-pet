import { describe, it, expect } from 'vitest'
import { loadPet } from './helpers.js'

describe('1级路由', () => {
  it('route() 按优先级分类', () => {
    const { seam } = loadPet()
    const r = seam.route
    expect(r('你好呀')).toEqual({ layer: 1, intent: 'greet' })
    expect(r('饿了吗')).toEqual({ layer: 1, intent: 'state' })
    expect(r('帮我查一下这个 bug')).toEqual({ layer: 3, intent: 'task' })
    expect(r('怎么办，代码报错了')).toEqual({ layer: 1, intent: 'help' })
    expect(r('今天天气不错')).toEqual({ layer: 2, intent: 'fast' })
  })

  it('状态查询回答带数值', () => {
    const { seam } = loadPet()
    const ans = seam.stateAnswer({ food: 55, clean: 90, mood: 80 })
    expect(ans).toContain('55')
    expect(ans).toContain('饱食')
  })

  it('本地模板池覆盖四个意图', () => {
    const { seam } = loadPet()
    expect(seam.pools.greet.length).toBeGreaterThan(0)
    expect(seam.pools.interact.length).toBeGreaterThan(0)
    expect(seam.pools.chat.length).toBeGreaterThan(0)
    expect(seam.pools.advice.length).toBeGreaterThan(0)
  })
})
