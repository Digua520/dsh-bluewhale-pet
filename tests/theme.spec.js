import { describe, it, expect } from 'vitest'
import { loadPet, mockCtx } from './helpers.js'

describe('sunny-pixel 色板', () => {
  it('overrideTokens 载荷包含新色板关键色', () => {
    const { module } = loadPet()
    let captured = null
    const ctx = mockCtx({
      theme: { overrideTokens(plugin, tokens) { captured = { plugin, tokens } } },
    })
    module.apply(ctx)
    expect(captured).not.toBeNull()
    expect(captured.tokens['--dsw-alias-bg-base']).toEqual({ light: '#fffdf4', dark: '#151e28' })
    expect(captured.tokens['--dsw-alias-brand-primary']).toEqual({ light: '#4a90b8', dark: '#7ab8cc' })
    expect(captured.tokens['--dsw-alias-state-success-primary']).toEqual({ light: '#5fa84a', dark: '#6fbf5a' })
    // 完整性：108 键、亮暗取值非空（防止键丢失走 apply() 的 `|| ''` 静默回退）
    const keys = Object.keys(captured.tokens)
    expect(keys.length).toBe(108)
    for (const k of keys) {
      expect(typeof captured.tokens[k].light).toBe('string')
      expect(captured.tokens[k].light.length).toBeGreaterThan(0)
      expect(typeof captured.tokens[k].dark).toBe('string')
      expect(captured.tokens[k].dark.length).toBeGreaterThan(0)
    }
  })
})
