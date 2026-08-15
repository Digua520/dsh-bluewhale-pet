import { describe, it, expect, vi } from 'vitest'
import { loadPet, mockCtx } from './helpers.js'

describe('Ambient Observer', () => {
  it('信号正则三类命中', () => {
    const { seam } = loadPet()
    expect(seam.detectSignal('这个任务卡住了怎么办')).toBe('stuck')
    expect(seam.detectSignal('Error: Cannot find module')).toBe('error')
    expect(seam.detectSignal('帮帮我，这个不会写')).toBe('help')
    expect(seam.detectSignal('正常的一句话')).toBe(null)
  })

  it('防抖 3s：同窗口内不重复触发，窗口外再触发', async () => {
    vi.useFakeTimers()
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    const main = doc.createElement('div')
    main.className = 'chat-content'
    doc.body.appendChild(main)
    seam.observerStart()
    main.textContent = '报错了'
    vi.advanceTimersByTime(1000)      // scan at 500 → fire #1（lastSignalAt=500）
    expect(seam.tripleCount()).toBe(1)
    main.textContent = '又报错了'
    vi.advanceTimersByTime(1000)      // scan at 1500 → 1000-500 < 3000 → skip
    expect(seam.tripleCount()).toBe(1)
    vi.advanceTimersByTime(3000)      // t=5000
    main.textContent = '再次报错'
    vi.advanceTimersByTime(1000)      // 第二次文本变更后第 6 个 500ms 拍触发 fire #2（距首次触发满 3s 窗口）
    expect(seam.tripleCount()).toBe(2)
    cleanup()
    vi.useRealTimers()
  })

  it('未点【排查】绝不注入主聊天流；点击后注入', async () => {
    const { dom, seam } = loadPet()
    const doc = dom.window.document
    const mainInput = doc.createElement('textarea')
    mainInput.className = 'main-chat-input'
    doc.body.appendChild(mainInput)
    const cleanup = seam.apply(mockCtx())
    seam.observerStart()
    seam.tripleFire('stuck', '卡住了')
    expect(mainInput.value).toBe('')
    const btn = doc.querySelector('#dsh-pet-root .pc-fix-btn')
    expect(btn).not.toBeNull()
    btn.click()
    expect(mainInput.value).toContain('排查')
    cleanup()
  })

  it('无 .chat-content 且无 main 时绝不回退扫描 body（防自触发）', () => {
    vi.useFakeTimers()
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    const doc = dom.window.document
    // 页面上没有 .chat-content / main 元素（宠物自身 root 在 body 上，含"报错"字样也不该触发）
    expect(doc.querySelector('.chat-content')).toBeNull()
    vi.advanceTimersByTime(4000)
    expect(seam.tripleCount()).toBe(0)
    cleanup()
    vi.useRealTimers()
  })

  it('三连面板记录写入宠物对话', () => {
    const { dom, seam } = loadPet()
    const cleanup = seam.apply(mockCtx())
    seam.tripleFire('help', '帮帮我')
    const msgs = [...dom.window.document.querySelectorAll('#dsh-pet-chat .pc-msg')]
    expect(msgs.some((m) => m.textContent.includes('【主屏信号】'))).toBe(true)
    cleanup()
  })

  it('气泡点击排查后立即隐藏；8s 未点自动隐藏', () => {
    vi.useFakeTimers()
    const { dom, seam } = loadPet()
    const doc = dom.window.document
    const mainInput = doc.createElement('textarea')
    doc.body.appendChild(mainInput)
    const cleanup = seam.apply(mockCtx())
    seam.tripleFire('error', '报错')
    const bubble = doc.getElementById('dsh-pet-bubble')
    expect(bubble.style.display).toBe('block')
    doc.querySelector('#dsh-pet-root .pc-fix-btn').click()
    expect(bubble.style.display).toBe('none')
    seam.tripleFire('error', '又报错')
    expect(bubble.style.display).toBe('block')
    vi.advanceTimersByTime(8000)
    expect(bubble.style.display).toBe('none')
    cleanup()
    vi.useRealTimers()
  })

  it('尾部文案稳定时越过多个防抖窗口也不重复触发', () => {
    vi.useFakeTimers()
    const { dom, seam } = loadPet()
    const doc = dom.window.document
    const main = doc.createElement('div')
    main.className = 'chat-content'
    doc.body.appendChild(main)
    const cleanup = seam.apply(mockCtx())
    seam.observerStart()
    main.textContent = '报错了'
    vi.advanceTimersByTime(1000)
    expect(seam.tripleCount()).toBe(1)
    vi.advanceTimersByTime(10000)
    expect(seam.tripleCount()).toBe(1)
    cleanup()
    vi.useRealTimers()
  })
})
