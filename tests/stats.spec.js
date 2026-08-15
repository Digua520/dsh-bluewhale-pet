import { describe, it, expect, vi } from 'vitest'
import { loadPet } from './helpers.js'

describe('养成数值', () => {
  it('seam 暴露 stats 纯逻辑（阈值/衰减/亲密度）', () => {
    const { seam } = loadPet()
    expect(seam.statsLogic).toBeDefined()

    // 阈值：饥饿 <30 / 无聊 <25 / 脏污 <20
    expect(seam.statsLogic.stateOf({ food: 40, clean: 40, mood: 40 })).toBe('开心')
    expect(seam.statsLogic.stateOf({ food: 29, clean: 40, mood: 40 })).toBe('饿了')
    expect(seam.statsLogic.stateOf({ food: 40, clean: 40, mood: 24 })).toBe('无聊')
    expect(seam.statsLogic.stateOf({ food: 40, clean: 19, mood: 40 })).toBe('脏兮兮')

    // 衰减速率：饱食 -1/3min，心情 -1/2min，清洁 -1/5min（2s tick）
    const s1 = { food: 60, mood: 60, clean: 60 }
    const s2 = seam.statsLogic.decay(s1)
    expect(s2.food).toBeCloseTo(60 - 1 / 90, 5)
    expect(s2.mood).toBeCloseTo(60 - 1 / 60, 5)
    expect(s2.clean).toBeCloseTo(60 - 1 / 150, 5)

    // 亲密度：每日上限 200
    expect(seam.statsLogic.addXp({ xp: 0, dailyXp: 0, date: '2026-08-15' }, 10, '2026-08-15'))
      .toMatchObject({ xp: 10, dailyXp: 10 })
    expect(seam.statsLogic.addXp({ xp: 190, dailyXp: 195, date: '2026-08-15' }, 10, '2026-08-15'))
      .toMatchObject({ xp: 195, dailyXp: 200 })
    expect(seam.statsLogic.addXp({ xp: 100, dailyXp: 200, date: '2026-08-15' }, 10, '2026-08-16'))
      .toMatchObject({ xp: 110, dailyXp: 10 })

    // 形态：0-200 / 201-600 / 601+
    expect(seam.statsLogic.levelOf(0).name).toBe('幼鲸')
    expect(seam.statsLogic.levelOf(200).name).toBe('幼鲸')
    expect(seam.statsLogic.levelOf(201).name).toBe('少年鲸')
    expect(seam.statsLogic.levelOf(601).name).toBe('成年鲸')
  })
})
