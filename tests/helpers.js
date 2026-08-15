/**
 * jsdom 装载器：在 jsdom 窗口里执行 lib/client.js（通过 __ModuleLoader__ 桩
 * 捕获工厂返回的 {inject, apply}），并暴露 pet 内部供单测断言（测试 seam：
 * client.js 检测 window.__DSH_WHALE_TEST__ 时挂载内部函数）。
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { JSDOM } from 'jsdom'

const CLIENT = join(dirname(fileURLToPath(import.meta.url)), '..', 'lib', 'client.js')

/** 捕获 client.js 的模块对象与 seam，并返回 jsdom 环境。 */
export function loadPet(overrides = {}) {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
    // 必需：无 runScripts 时 jsdom 的 window.eval 在 Node 全局作用域求值，
    // window/document 等全局不可见，client.js 会抛 "window is not defined"。
    runScripts: 'dangerously',
  })
  const { window } = dom
  window.__ModuleLoader__ = {
    load(module) {
      window.__PET_MODULE__ = module.factory(() => {})
    },
  }
  window.__DSH_WHALE_TEST__ = {}
  window.eval(readFileSync(CLIENT, 'utf8'))
  if (!window.__PET_MODULE__) throw new Error('client.js did not register a module')
  return { dom, window, module: window.__PET_MODULE__, seam: window.__DSH_WHALE_TEST__ }
}

/** 最小 cordis ctx 桩，覆盖 client.js 用到的面。effect 收集返回的 disposer，供测试走查清理。 */
export function mockCtx(overrides = {}) {
  const ctx = {
    disposers: [],
    effect(fn, label) {
      const d = fn()
      if (typeof d === 'function') ctx.disposers.push(d)
      return () => {}
    },
    theme: { overrideTokens() {}, setTheme() {}, register() {} },
    sessions: { create: async () => {}, binding: () => null },
    connection: { rpc: { call: async () => ({ ok: false, error: { code: 'no-handler', message: 'not registered' } }) } },
    on() {}, off() {},
    ...overrides,
  }
  return ctx
}
