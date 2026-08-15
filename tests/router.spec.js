import { describe, it, expect } from 'vitest'
import { loadPet, mockCtx } from './helpers.js'

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

  it('词表碰撞按优先级裁决', () => {
    const { seam } = loadPet()
    const r = seam.route
    // '帮帮我' 显式走 help（先于 task 判定）；'帮我' 走 task
    expect(r('帮帮我卡住了怎么办')).toEqual({ layer: 1, intent: 'help' })
    expect(r('帮我写个脚本')).toEqual({ layer: 3, intent: 'task' })
    // 同含 greet(hi) 与 chat(水)：greet 在前
    expect(r('hi 想喝水')).toEqual({ layer: 1, intent: 'greet' })
    // 同含 help(怎么办) 与 task(写)：task 在前
    expect(r('怎么办写不出来了')).toEqual({ layer: 3, intent: 'task' })
    // farewell 优先于 greet（'再见'已从 greet 移出）
    expect(r('再见啦')).toEqual({ layer: 1, intent: 'farewell' })
  })

  it('IME 组合期间按 Enter 不发送消息', () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    const input = doc.getElementById('dsh-pet-input')
    input.value = 'nihao'
    const ev = new dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    // jsdom 构造器若不支持 isComposing 参数，用 defineProperty 注入：
    Object.defineProperty(ev, 'isComposing', { value: true })
    input.dispatchEvent(ev)
    expect(doc.querySelectorAll('#dsh-pet-chat .pc-msg').length).toBe(0)
    cleanup()
  })

  it('route 对含空格输入做空白归一化', () => {
    const { seam } = loadPet()
    expect(seam.route('你 好')).toEqual({ layer: 1, intent: 'greet' })
    expect(seam.route('你好')).toEqual({ layer: 1, intent: 'greet' })
    expect(seam.route('没 反应')).toEqual({ layer: 1, intent: 'help' })
  })
})
