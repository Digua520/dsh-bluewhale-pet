import { describe, it, expect, vi } from 'vitest'
import { loadPet, mockCtx } from './helpers.js'

describe('3级委派任务', () => {
  it('布置任务 → 委派话术 + 任务卡挂载 + 头顶进度条', async () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    const input = doc.getElementById('dsh-pet-input')
    input.value = '帮我分析一下这个 bug'
    doc.getElementById('dsh-pet-send').click()
    const msgs = [...doc.querySelectorAll('#dsh-pet-chat .pc-msg')]
    expect(msgs.some((m) => m.textContent.includes('开始潜水处理'))).toBe(true)
    expect(doc.querySelector('#dsh-pet-tasks .task.doing')).not.toBeNull()
    expect(doc.querySelector('#dsh-pet-tasks .task.doing .tstate').textContent).toContain('▶')
    cleanup()
  })

  it('假管线推进到 100% → 完成态 + 播报 + 进度条闪烁', async () => {
    vi.useFakeTimers()
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    doc.getElementById('dsh-pet-input').value = '帮我写个脚本'
    doc.getElementById('dsh-pet-send').click()
    const task = doc.querySelector('#dsh-pet-tasks .task.doing')
    expect(task).not.toBeNull()
    // 假管线每 4.2s +9%，快进到完成
    vi.advanceTimersByTime(4200 * 12)
    expect(task.classList.contains('done')).toBe(true)
    expect(task.querySelector('.tstate').textContent).toContain('✓')
    expect(doc.querySelector('.pet-hp .hpb i').classList.contains('flash')).toBe(true)
    cleanup()
    vi.useRealTimers()
  })

  it('完成播报 confetti 粒子数封顶且自动清理', async () => {
    vi.useFakeTimers()
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    doc.getElementById('dsh-pet-input').value = '帮我查个资料'
    doc.getElementById('dsh-pet-send').click()
    vi.advanceTimersByTime(4200 * 12 + 100)
    const confetti = doc.querySelectorAll('#dsh-pet-root .confetti')
    expect(confetti.length).toBeLessThanOrEqual(60)
    vi.advanceTimersByTime(5000)
    expect(doc.querySelectorAll('#dsh-pet-root .confetti').length).toBe(0)
    cleanup()
    vi.useRealTimers()
  })

  it('任务名含 HTML 时以纯文本渲染（防注入）', () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    const input = doc.getElementById('dsh-pet-input')
    input.value = '帮我<img src=x onerror=alert(1)>'
    doc.getElementById('dsh-pet-send').click()
    const taskName = doc.querySelector('#dsh-pet-tasks .task .tname span')
    expect(taskName.textContent).toBe('帮我<img src=x onerror=ale')
    expect(doc.querySelector('#dsh-pet-tasks .task img')).toBeNull()
    cleanup()
  })
})
