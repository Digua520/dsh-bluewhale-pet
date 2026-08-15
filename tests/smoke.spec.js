import { describe, it, expect } from 'vitest'
import { loadPet, mockCtx } from './helpers.js'

describe('dsh-bluewhale-pet 冒烟', () => {
  it('apply() 挂载宠物 DOM，disposer 清理后无残留', () => {
    const { dom, module } = loadPet()
    const ctx = mockCtx()
    expect(module.inject).toEqual(['theme', 'connection'])
    module.apply(ctx)
    expect(dom.window.document.getElementById('dsh-pet-root')).not.toBeNull()
    expect(dom.window.document.getElementById('dsh-pet-root').children.length).toBeGreaterThan(0)
    expect(dom.window.document.querySelector('style[data-plugin-css="dsh-bluewhale-pet"]')).not.toBeNull()
    ctx.disposers.forEach((d) => d())
    expect(dom.window.document.getElementById('dsh-pet-root')).toBeNull()
    expect(dom.window.document.querySelector('style[data-plugin-css="dsh-bluewhale-pet"]')).toBeNull()
    expect(dom.window.document.getElementById('dsh-pet-tail')).toBeNull()
  })
})
