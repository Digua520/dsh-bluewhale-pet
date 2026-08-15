/**
 * dsh-bluewhale-pet — browser half.
 *
 * Registers two pixel themes (sunny-pixel / sunny-pixel-dark) on the built-in
 * ThemeRuntime, injects the companion-pet stylesheet, and mounts the draggable
 * pixel whale with its three-tab panel (nurture / work / chat).
 *
 * Everything is plain DOM + CSS: no React, no framework imports, so the client
 * bundle stays dependency-free and uninstallable without residue (all effects
 * are disposed through ctx.effect).
 */

window.__ModuleLoader__.load({
  id: 'dsh-bluewhale-pet',
  factory(require) {
    /* ===================== Themes ===================== */

const LIGHT_TOKENS = {
  '--dsw-static-deepseek-500': '#58a6c8',
  '--dsw-static-deepseek-400': '#7ab8cc',
  '--dsw-static-deepseek-450': '#68b2d0',
  '--dsw-static-deepseek-200': '#cfe8f0',
  '--dsw-static-blue-450': '#68b2d0',
  '--dsw-static-blue-500': '#58a6c8',
  '--dsw-static-neutral-bluish-400': '#8fb0c0',
  '--dsw-alias-bg-base': '#fffdf4',
  '--dsw-alias-bg-layer-1': '#f7f4e8',
  '--dsw-alias-bg-layer-2': '#efead8',
  '--dsw-alias-bg-layer-3': '#e6e0c8',
  '--dsw-alias-bg-overlay': '#f7f4e8',
  '--dsw-alias-bg-mask-1': 'rgba(42, 68, 80, 0.18)',
  '--dsw-alias-bg-mask-2': 'rgba(42, 68, 80, 0.10)',
  '--dsw-alias-bg-mask-3': 'rgba(42, 68, 80, 0.40)',
  '--dsw-alias-bg-module-platform': '#eef0e0',
  '--dsw-alias-bg-multi-select': '#eef0e0',
  '--dsw-alias-bg-skeleton': 'rgba(42, 68, 80, 0.08)',
  '--dsw-alias-border-l1': 'rgba(42, 68, 80, 0.30)',
  '--dsw-alias-border-l2': 'rgba(42, 68, 80, 0.50)',
  '--dsw-alias-border-l3': 'rgba(42, 68, 80, 0.65)',
  '--dsw-alias-border-l4': 'rgba(42, 68, 80, 0.80)',
  '--dsw-alias-label-primary': '#2a4450',
  '--dsw-alias-label-secondary': '#3a5a6a',
  '--dsw-alias-label-tertiary': '#5a7a8a',
  '--dsw-alias-label-caption': '#7a9aa8',
  '--dsw-alias-label-dimmed': '#9ab4c0',
  '--dsw-alias-brand-primary': '#4a90b8',
  '--dsw-alias-brand-text': '#fffdf4',
  '--dsw-alias-button-primary-hover': '#3d7fa3',
  '--dsw-alias-button-primary-dimmed': '#d8ecf4',
  '--dsw-alias-button-elevated-fill': '#f7f4e8',
  '--dsw-alias-button-floating-fill': '#f7f4e8',
  '--dsw-alias-button-floating-hover': '#e6e0c8',
  '--dsw-alias-button-ghost-active-border': '#a8c8d8',
  '--dsw-alias-button-ghost-active-fill': '#d8ecf4',
  '--dsw-alias-button-ghost-active-hover': '#c8e0ec',
  '--dsw-alias-state-business-primary': '#4a90b8',
  '--dsw-alias-state-business-tertiary': '#d8ecf4',
  '--dsw-alias-state-error-primary': '#c85050',
  '--dsw-alias-state-error-secondary': '#c85050',
  '--dsw-alias-state-success-primary': '#5fa84a',
  '--dsw-alias-state-success-secondary': '#5fa84a',
  '--dsw-alias-state-success-tertiary': '#d8f0d0',
  '--dsw-alias-state-warn-label': '#7a5a10',
  '--dsw-alias-state-warn-primary': '#d8a040',
  '--dsw-alias-state-warn-secondary': '#d8a040',
  '--dsw-alias-state-warn-tertiary': '#f8ecc0',
  '--dsw-alias-interactive-bg-hover': 'rgba(74, 144, 184, 0.12)',
  '--dsw-alias-interactive-bg-active': 'rgba(74, 144, 184, 0.22)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgba(74, 144, 184, 0.18)',
  '--dsw-alias-interactive-bg-hover-danger': 'rgba(200, 80, 80, 0.10)',
  '--dsw-alias-interactive-bg-hover-solid': '#d8ecf4',
  '--dsw-alias-markdown-code-block': '#eef0e0',
  '--dsw-alias-markdown-code-block-banner': '#eef0e0',
  '--dsw-alias-markdown-code-segment-selected': '#f7f4e8',
  '--dsw-alias-markdown-code-segment-unselected': '#efead8',
  '--dsw-alias-markdown-citation': '#d8ecf4',
  '--dsw-alias-markdown-inline-code': '#d8ecf4',
  '--dsw-alias-markdown-placeholder': '#d8ecf4',
  '--dsw-alias-markdown-tag': '#d8ecf4',
  '--dsw-alias-toast-bg': '#e6e0c8',
  '--dsw-alias-tooltip-bg': '#d0c8a8',
  '--dsw-specific-sidebar-fill': '#e4e8d8',
  '--dsw-specific-sidebar-nav-item-active': '#c8dcb8',
  '--dsw-specific-sidebar-nav-item-active-accent': 'rgba(74, 144, 184, 0.25)',
  '--dsw-specific-sidebar-nav-item-hover': '#d0c8a8',
  '--dsw-specific-bubble': '#f7f4e8',
  '--dsw-specific-bubble-highlight': '#d8f0d0',
  '--dsw-specific-input-major': '#ffffff',
  '--dsw-specific-login-input': '#efead8',
  '--dsw-specific-menu': '#f7f4e8',
  '--dsw-specific-selector': '#e6e0c8',
  '--dsw-specific-tip': '#d8ecf4',
  '--dsw-alias-separator-primary': 'rgba(74, 144, 184, 0.35)',
  '--dsw-alias-scrollbar-bg-l1': '#d0c8a8',
  '--dsw-alias-scrollbar-bg-l2': '#c0b898',
  '--dsw-alias-scrollbar-hover-l1': '#b0a888',
  '--dsw-alias-scrollbar-hover-l2': '#b0a888',
  '--dsw-alias-bg-mask-photo': 'rgba(42, 68, 80, 0.88)',
  '--dsw-alias-bg-mask-drop': 'rgba(247, 244, 232, 0.7)',
  '--dsw-alias-border-inverted2': 'rgba(0, 0, 0, 0)',
  '--dsw-alias-border-inverted': 'rgba(0, 0, 0, 0)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgba(42, 68, 80, 0.25)',
  '--dsw-alias-brand-primary-invert': '#ffffff',
  '--dsw-alias-brand-primary-new-colorprimary-new-color': '#4a90b8',
  '--dsw-alias-button-contrast-fill': '#3a5a6a',
  '--dsw-alias-button-info-fill': '#4a90b8',
  '--dsw-alias-button-info-hover': '#68aac4',
  '--dsw-alias-button-primary-fill': '#4a90b8',
  '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(42, 68, 80, 0.36)',
  '--dsw-alias-button-tool-bar-fill': 'rgba(42, 68, 80, 0.5)',
  '--dsw-alias-button-tool-bar-hover': 'rgba(42, 68, 80, 0.6)',
  '--dsw-alias-label-primary-bluish': '#2a7a9d',
  '--dsw-alias-label-primary-dimmed': '#3a5a6a',
  '--dsw-alias-label-primary-foreground': '#ffffff',
  '--dsw-alias-label-primary-inverted': '#ffffff',
  '--shiki-foreground': '#2a4450',
  '--shiki-background': '#eef4f0',
  '--shiki-token-constant': '#b88030',
  '--shiki-token-string': '#5aa878',
  '--shiki-token-comment': '#9ab8b0',
  '--shiki-token-keyword': '#7ab8b8',
  '--shiki-token-parameter': '#d87070',
  '--shiki-token-function': '#6a98b8',
  '--shiki-token-string-expression': '#5aa878',
  '--shiki-token-punctuation': '#8aa8a0',
  '--shiki-token-link': '#6a98b8',
}

const DARK_TOKENS = {
  '--dsw-static-deepseek-500': '#7ab8cc',
  '--dsw-static-deepseek-400': '#8fc8dc',
  '--dsw-static-deepseek-450': '#7ab8cc',
  '--dsw-static-deepseek-200': '#1b2733',
  '--dsw-static-blue-450': '#8fc8dc',
  '--dsw-static-blue-500': '#7ab8cc',
  '--dsw-static-neutral-bluish-400': '#5a7a8a',
  '--dsw-alias-bg-base': '#151e28',
  '--dsw-alias-bg-layer-1': '#1b2733',
  '--dsw-alias-bg-layer-2': '#212f3e',
  '--dsw-alias-bg-layer-3': '#273748',
  '--dsw-alias-bg-overlay': '#1b2733',
  '--dsw-alias-bg-mask-1': 'rgba(0, 0, 0, 0.55)',
  '--dsw-alias-bg-mask-2': 'rgba(0, 0, 0, 0.30)',
  '--dsw-alias-bg-mask-3': 'rgba(0, 0, 0, 0.70)',
  '--dsw-alias-bg-module-platform': '#212f3e',
  '--dsw-alias-bg-multi-select': '#212f3e',
  '--dsw-alias-bg-skeleton': 'rgba(122, 184, 204, 0.06)',
  '--dsw-alias-border-l1': 'rgba(122, 184, 204, 0.15)',
  '--dsw-alias-border-l2': 'rgba(122, 184, 204, 0.25)',
  '--dsw-alias-border-l3': 'rgba(122, 184, 204, 0.35)',
  '--dsw-alias-border-l4': 'rgba(122, 184, 204, 0.50)',
  '--dsw-alias-label-primary': '#c8dce8',
  '--dsw-alias-label-secondary': '#90a8b8',
  '--dsw-alias-label-tertiary': '#7890a0',
  '--dsw-alias-label-caption': '#7890a0',
  '--dsw-alias-label-dimmed': '#5a7080',
  '--dsw-alias-brand-primary': '#7ab8cc',
  '--dsw-alias-brand-text': '#0e141a',
  '--dsw-alias-button-primary-hover': '#8fc8dc',
  '--dsw-alias-button-primary-dimmed': '#212f3e',
  '--dsw-alias-button-elevated-fill': '#212f3e',
  '--dsw-alias-button-floating-fill': '#212f3e',
  '--dsw-alias-button-floating-hover': '#273748',
  '--dsw-alias-button-ghost-active-border': '#2f4558',
  '--dsw-alias-button-ghost-active-fill': '#212f3e',
  '--dsw-alias-button-ghost-active-hover': '#273748',
  '--dsw-alias-state-business-primary': '#7ab8cc',
  '--dsw-alias-state-business-tertiary': '#212f3e',
  '--dsw-alias-state-error-primary': '#d86868',
  '--dsw-alias-state-error-secondary': '#d86868',
  '--dsw-alias-state-success-primary': '#6fbf5a',
  '--dsw-alias-state-success-secondary': '#6fbf5a',
  '--dsw-alias-state-success-tertiary': '#21301e',
  '--dsw-alias-state-warn-label': '#f0d488',
  '--dsw-alias-state-warn-primary': '#a88430',
  '--dsw-alias-state-warn-secondary': '#a88430',
  '--dsw-alias-state-warn-tertiary': '#2a2810',
  '--dsw-alias-interactive-bg-hover': 'rgba(122, 184, 204, 0.10)',
  '--dsw-alias-interactive-bg-active': 'rgba(122, 184, 204, 0.20)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgba(122, 184, 204, 0.15)',
  '--dsw-alias-interactive-bg-hover-danger': 'rgba(216, 104, 104, 0.12)',
  '--dsw-alias-interactive-bg-hover-solid': '#273748',
  '--dsw-alias-markdown-code-block': '#18232e',
  '--dsw-alias-markdown-code-block-banner': '#212f3e',
  '--dsw-alias-markdown-code-segment-selected': '#1b2733',
  '--dsw-alias-markdown-code-segment-unselected': '#212f3e',
  '--dsw-alias-markdown-citation': '#212f3e',
  '--dsw-alias-markdown-inline-code': '#212f3e',
  '--dsw-alias-markdown-placeholder': '#212f3e',
  '--dsw-alias-markdown-tag': '#212f3e',
  '--dsw-alias-toast-bg': '#273748',
  '--dsw-alias-tooltip-bg': '#2f4454',
  '--dsw-specific-sidebar-fill': '#18232e',
  '--dsw-specific-sidebar-nav-item-active': '#2f4558',
  '--dsw-specific-sidebar-nav-item-active-accent': 'rgba(122, 184, 204, 0.25)',
  '--dsw-specific-sidebar-nav-item-hover': '#273748',
  '--dsw-specific-bubble': '#1b2733',
  '--dsw-specific-bubble-highlight': '#243828',
  '--dsw-specific-input-major': '#1b2733',
  '--dsw-specific-login-input': '#212f3e',
  '--dsw-specific-menu': '#1b2733',
  '--dsw-specific-selector': '#273748',
  '--dsw-specific-tip': '#212f3e',
  '--dsw-alias-separator-primary': 'rgba(122, 184, 204, 0.25)',
  '--dsw-alias-scrollbar-bg-l1': '#2f4454',
  '--dsw-alias-scrollbar-bg-l2': '#38505f',
  '--dsw-alias-scrollbar-hover-l1': '#48606f',
  '--dsw-alias-scrollbar-hover-l2': '#48606f',
  '--dsw-alias-bg-mask-photo': 'rgba(0, 0, 0, 0.88)',
  '--dsw-alias-bg-mask-drop': 'rgba(27, 39, 51, 0.7)',
  '--dsw-alias-border-inverted2': 'rgba(200, 220, 232, 0.08)',
  '--dsw-alias-border-inverted': 'rgba(200, 220, 232, 0.06)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgba(200, 220, 232, 0.06)',
  '--dsw-alias-brand-primary-invert': '#0e141a',
  '--dsw-alias-brand-primary-new-colorprimary-new-color': '#7ab8cc',
  '--dsw-alias-button-contrast-fill': '#90a8b8',
  '--dsw-alias-button-info-fill': '#8fc8dc',
  '--dsw-alias-button-info-hover': '#7ab8cc',
  '--dsw-alias-button-primary-fill': '#7ab8cc',
  '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(90, 122, 138, 0.36)',
  '--dsw-alias-button-tool-bar-fill': 'rgba(90, 122, 138, 0.5)',
  '--dsw-alias-button-tool-bar-hover': 'rgba(90, 122, 138, 0.6)',
  '--dsw-alias-label-primary-bluish': '#90c8d8',
  '--dsw-alias-label-primary-dimmed': '#a0b8c8',
  '--dsw-alias-label-primary-foreground': '#0e141a',
  '--dsw-alias-label-primary-inverted': '#273748',
  '--shiki-foreground': '#d8e4ec',
  '--shiki-background': '#1c242c',
  '--shiki-token-constant': '#e0b860',
  '--shiki-token-string': '#8fd47a',
  '--shiki-token-comment': '#6a8a7c',
  '--shiki-token-keyword': '#7ab8cc',
  '--shiki-token-parameter': '#e09090',
  '--shiki-token-function': '#8ab8d8',
  '--shiki-token-string-expression': '#8fd47a',
  '--shiki-token-punctuation': '#8aa89a',
  '--shiki-token-link': '#8ab8d8',
}

const THEMES = [
  { id: 'sunny-pixel', colorScheme: 'light', tokens: LIGHT_TOKENS },
  { id: 'sunny-pixel-dark', colorScheme: 'dark', tokens: DARK_TOKENS },
]

/* ===================== Stylesheet ===================== */

const CSS = String.raw`
/* ===== dsh-bluewhale-pet: pixel whale companion ===== */
#dsh-pet-root { all: initial; }
#dsh-pet-root, #dsh-pet-root * { box-sizing: border-box; margin: 0; padding: 0; }
#dsh-pet-root .pxfont { font-family: 'Fusion Pixel', 'Zpix', 'Courier New', Consolas, monospace; font-weight: bold; -webkit-font-smoothing: none; }
#dsh-pet-root .cnfont { font-family: 'Fusion Pixel', 'Zpix', 'SimSun', 'NSimSun', serif; font-weight: bold; -webkit-font-smoothing: none; }

#dsh-pet-root {
  position: fixed; z-index: 2147483000; right: 14px; bottom: 60px;
  width: 100px; display: flex; flex-direction: column; align-items: center;
  cursor: grab; user-select: none; image-rendering: pixelated;
  font-size: 12px; line-height: 1.4;
}
#dsh-pet-root.dragging { cursor: grabbing; }
#dsh-pet-root.hidden { display: none !important; }

/* 头顶进度条 */
#dsh-pet-root .pet-hp {
  width: 76px; background: #fffdf4; border: 2px solid #7a9a8a; padding: 1.5px 3px; margin-bottom: 2px;
  display: flex; align-items: center; gap: 3px; box-shadow: 2px 2px 0 rgba(0,0,0,0.12);
}
#dsh-pet-root .pet-hp .hpb { flex: 1; height: 7px; border: 2px solid #7a9a8a; background: #e8f4e0; }
#dsh-pet-root .pet-hp .hpb i { display: block; height: 100%; background: linear-gradient(90deg, #8fd47a, #f5d878); }
#dsh-pet-root .pet-hp .hpv { font-size: 7.5px; color: #4a6a5a; min-width: 24px; text-align: right; }
#dsh-pet-root .pet-hp .hpb i.flash { animation: dshpet-hpflash 0.4s ease-in-out 3; }
@keyframes dshpet-hpflash { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.8); } }

/* 状态徽章 */
#dsh-pet-root .pet-state {
  display: block; margin: 0 auto 2px; background: #fffdf4; border: 2px solid #8fb88f; padding: 0 6px;
  font-size: 8.5px; white-space: nowrap; line-height: 14px; width: fit-content;
  box-shadow: 1px 1px 0 rgba(0,0,0,0.12);
}

/* 气泡 */
#dsh-pet-root .pet-bubble-tmp {
  position: absolute; top: -34px; left: 50%; transform: translateX(-50%);
  background: #fffdf4; border: 2px solid #7a9a8a; padding: 3px 9px; font-size: 10px; white-space: nowrap;
  z-index: 6; box-shadow: 2px 2px 0 rgba(0,0,0,0.12); max-width: 220px;
}
#dsh-pet-root .pet-bubble-tmp::after {
  content: ''; position: absolute; left: 50%; bottom: -7px; width: 9px; height: 7px;
  background: #fffdf4; border-left: 2px solid #7a9a8a; border-bottom: 2px solid #7a9a8a;
  transform: translateX(-50%);
}

/* 鲸鱼本体 */
#dsh-pet-root .whale { width: 56px; height: 49px; transition: width 0.3s steps(3), height 0.3s steps(3); }
#dsh-pet-root .whale.lv0 { width: 36px; height: 31px; }
#dsh-pet-root .whale.lv1 { width: 48px; height: 42px; }
#dsh-pet-root .whale.lv2 { width: 56px; height: 49px; }
#dsh-pet-root .whale svg { width: 100%; height: 100%; }
#dsh-pet-root .whale.swim { animation: dshpet-swim 2.6s ease-in-out infinite; }
@keyframes dshpet-swim { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
#dsh-pet-root .spout { position: absolute; top: -14px; left: 30%; display: flex; gap: 2px; }
#dsh-pet-root .whale.lv0 ~ .spout { left: 25%; }
#dsh-pet-root .spout i { width: 4px; height: 8px; background: #8fa8ff; display: block; animation: dshpet-spout 1.6s ease-in-out infinite; }
#dsh-pet-root .spout i:nth-child(2) { animation-delay: 0.3s; }
#dsh-pet-root .spout i:nth-child(3) { animation-delay: 0.6s; }
@keyframes dshpet-spout { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-5px); opacity: 1; } }
#dsh-pet-root .whale-shadow { width: 56px; height: 7px; background: rgba(60, 90, 70, 0.25); margin-top: 1px; }
#dsh-pet-root .pet-hint {
  font-size: 9px; color: #4a6a5a; background: #fffdf4; border: 2px solid #8fb88f;
  padding: 1px 6px; margin-top: 2px; white-space: nowrap;
}

/* 动作动画 */
@keyframes dshpet-eat { 0%,100% { transform: scale(1); } 25% { transform: scale(0.92) rotate(-5deg); } 50% { transform: scale(1.06) rotate(4deg); } 75% { transform: scale(0.95) rotate(-3deg); } }
#dsh-pet-root .whale.act-eat { animation: dshpet-eat 0.45s ease-in-out 2 !important; }
@keyframes dshpet-play { 0%,100% { transform: translateY(0); } 30% { transform: translateY(-16px) rotate(-8deg); } 60% { transform: translateY(-6px) rotate(6deg); } 80% { transform: translateY(-13px) rotate(-4deg); } }
#dsh-pet-root .whale.act-play { animation: dshpet-play 0.65s ease-in-out 2 !important; }
@keyframes dshpet-bath { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } 75% { transform: rotate(-5deg); } }
#dsh-pet-root .whale.act-bath { animation: dshpet-bath 0.55s ease-in-out 2 !important; }
#dsh-pet-root .drop { position: absolute; top: 4px; width: 4px; height: 8px; background: #a8d8ea; border: 1px solid #7ab8c8; animation: dshpet-drop 0.9s ease-in infinite; z-index: 5; }
@keyframes dshpet-drop { from { transform: translateY(0); opacity: 1; } to { transform: translateY(52px); opacity: 0; } }

/* 状态动画 */
@keyframes dshpet-slow { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-2px) rotate(1deg); } }
#dsh-pet-root .whale.state-hungry { animation: dshpet-slow 3.4s ease-in-out infinite !important; filter: saturate(0.85); }
@keyframes dshpet-shiver { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-2px); } 75% { transform: translateX(2px); } }
#dsh-pet-root .whale.state-dirty { animation: dshpet-shiver 0.5s ease-in-out infinite !important; filter: saturate(0.7) brightness(0.92); }
@keyframes dshpet-doze { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(2px) scaleY(0.97); } }
#dsh-pet-root .whale.state-sleep { animation: dshpet-doze 3s ease-in-out infinite !important; }
#dsh-pet-root .zzz { position: absolute; top: -20px; right: 4px; font-size: 10px; color: #7a9a8a; animation: dshpet-zzz 2.2s ease-in-out infinite; z-index: 6; }
@keyframes dshpet-zzz { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-6px); opacity: 1; } }

/* 面板 */
#dsh-pet-root .pet-card {
  display: none; position: absolute; z-index: 7; width: 268px;
  background: #fffdf4; border: 3px solid #7a9a8a; box-shadow: 4px 4px 0 rgba(60,90,70,0.25);
  bottom: 96px; right: 0; cursor: default;
}
#dsh-pet-root .pet-card.open { display: block; }
#dsh-pet-root .pc-head { display: flex; align-items: center; gap: 6px; padding: 7px 9px; background: linear-gradient(180deg, #9fd8c8, #7ab8a8); border-bottom: 3px solid #5a9a8a; }
#dsh-pet-root .pc-head .nm { font-size: 12px; color: #fff; flex: 1; text-shadow: 1px 1px 0 rgba(60,100,90,0.5); }
#dsh-pet-root .pc-head .cl { background: rgba(60,100,90,0.25); border: 2px solid #5a9a8a; color: #fff; font-size: 10px; cursor: pointer; padding: 1px 7px; }
#dsh-pet-root .pc-tabs { display: flex; border-bottom: 2px solid #8fb88f; }
#dsh-pet-root .pc-tabs button { flex: 1; padding: 5px 0; font-size: 10.5px; background: #e8f4e0; border: none; border-right: 2px solid #8fb88f; cursor: pointer; color: #4a6a5a; }
#dsh-pet-root .pc-tabs button:last-child { border-right: none; }
#dsh-pet-root .pc-tabs button.on { background: #8fd47a; color: #fff; }
#dsh-pet-root .pc-body { padding: 9px; }
#dsh-pet-root .ptab { display: none; }
#dsh-pet-root .ptab.on { display: block; }
#dsh-pet-root .xp-row { display: flex; align-items: center; gap: 5px; margin: 2px 0 8px; font-size: 10px; color: #4a6a5a; }
#dsh-pet-root .xp-row .lvl { background: #f5d878; border: 2px solid #b89030; color: #7a5a10; padding: 0 6px; font-size: 9px; white-space: nowrap; }
#dsh-pet-root .xp-row .bar { flex: 1; height: 8px; border: 2px solid #8fb88f; background: #e8f4e0; }
#dsh-pet-root .xp-row .bar i { display: block; height: 100%; background: linear-gradient(90deg, #f5d878, #f0b040); }
#dsh-pet-root .stat { display: flex; align-items: center; gap: 5px; margin: 4px 0; font-size: 10px; color: #3d5a4a; }
#dsh-pet-root .stat .bar { flex: 1; height: 8px; border: 2px solid #8fb88f; background: #e8f4e0; }
#dsh-pet-root .stat .bar i { display: block; height: 100%; background: #8fd47a; }
#dsh-pet-root .acts { display: flex; gap: 3px; margin-top: 7px; }
#dsh-pet-root .acts button { flex: 1; padding: 5px 0; font-size: 10px; background: #f5f8ee; border: 2px solid #8fb88f; cursor: pointer; color: #4a6a5a; }
#dsh-pet-root .acts button:hover { background: #8fd47a; color: #fff; }
#dsh-pet-root .overall { border: 2px solid #8fb88f; background: #f5f8ee; padding: 7px 9px; margin-bottom: 7px; }
#dsh-pet-root .overall .ot { display: flex; justify-content: space-between; font-size: 10.5px; color: #4a6a5a; margin-bottom: 4px; }
#dsh-pet-root .overall .ot .op { color: #8a9a5a; }
#dsh-pet-root .overall .obar { height: 11px; border: 2px solid #7a9a8a; background: #fff; }
#dsh-pet-root .overall .obar i { display: block; height: 100%; background: linear-gradient(90deg, #8fd47a, #f5d878); }
#dsh-pet-root .overall .ol { font-size: 9px; color: #8aa89a; margin-top: 3px; }
#dsh-pet-root .task { border: 2px solid #8fb88f; background: #f5f8ee; padding: 5px 7px; font-size: 10px; margin-bottom: 5px; color: #3d5a4a; }
#dsh-pet-root .task .tname { display: flex; justify-content: space-between; }
#dsh-pet-root .task .tstate { font-size: 8.5px; padding: 1px 5px; border: 1.5px solid #8fb88f; background: #fff; }
#dsh-pet-root .task.doing .tstate { background: #fdf6dc; }
#dsh-pet-root .task.done .tstate { background: #8fd47a; color: #fff; border-color: #5aa04a; }
#dsh-pet-root .task .tbar { height: 6px; border: 2px solid #8fb88f; background: #fff; margin-top: 4px; }
#dsh-pet-root .task .tbar i { display: block; height: 100%; background: #f5d878; }
#dsh-pet-root .pet-chat { display: flex; flex-direction: column; gap: 4px; max-height: 110px; overflow-y: auto; }
#dsh-pet-root .pc-msg { font-size: 10px; padding: 4px 7px; border: 2px solid #8fb88f; }
#dsh-pet-root .pc-msg.me { align-self: flex-end; background: #f5f8ee; }
#dsh-pet-root .pc-msg.pet { align-self: flex-start; background: #e8f4e0; }
#dsh-pet-root .pet-talk { display: flex; gap: 3px; margin-top: 6px; }
#dsh-pet-root .pet-talk input { flex: 1; border: 2px solid #8fb88f; background: #fff; padding: 4px 7px; font-size: 10px; color: #3d5a4a; }
#dsh-pet-root .pet-talk button { padding: 4px 9px; background: #8fd47a; border: 2px solid #5aa04a; color: #fff; font-size: 10px; cursor: pointer; }
#dsh-pet-root .pc-leave { text-align: right; margin-top: 6px; }
#dsh-pet-root .pc-leave button { background: none; border: none; color: #8aa89a; font-size: 9px; cursor: pointer; text-decoration: underline; }
#dsh-pet-root .pc-leave button:hover { color: #d87070; }
#dsh-pet-root .pet-theme-switch { display: flex; gap: 3px; margin-bottom: 6px; }
#dsh-pet-root .pet-theme-switch button { flex: 1; padding: 3px 0; font-size: 9px; background: #e8f4e0; border: 2px solid #8fb88f; cursor: pointer; color: #4a6a5a; }
#dsh-pet-root .pet-theme-switch button.on { background: #8fd47a; color: #fff; }

/* 暗色适配（跟随 sunny-pixel-dark 主题） */
body[data-ds-dark-theme] #dsh-pet-root .pet-hp,
body[data-ds-dark-theme] #dsh-pet-root .pet-state,
body[data-ds-dark-theme] #dsh-pet-root .pet-bubble-tmp,
body[data-ds-dark-theme] #dsh-pet-root .pet-hint { background: #1b2733; border-color: #2f4558; color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .pet-hp .hpb { border-color: #2f4558; background: #212f3e; }
body[data-ds-dark-theme] #dsh-pet-root .pet-hp .hpv { color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .pet-card { background: #1b2733; border-color: #2f4558; box-shadow: 4px 4px 0 rgba(0,0,0,0.4); }
body[data-ds-dark-theme] #dsh-pet-root .pc-head { background: linear-gradient(180deg, #2f4558, #1b2733); border-color: #151e28; }
body[data-ds-dark-theme] #dsh-pet-root .pc-tabs { border-color: #2f4558; }
body[data-ds-dark-theme] #dsh-pet-root .pc-tabs button { background: #212f3e; color: #c8dce8; border-color: #2f4558; }
body[data-ds-dark-theme] #dsh-pet-root .pc-tabs button.on { background: #4a90b8; color: #fff; }
body[data-ds-dark-theme] #dsh-pet-root .overall { border-color: #2f4558; background: #212f3e; }
body[data-ds-dark-theme] #dsh-pet-root .overall .ot { color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .overall .ol { color: #7890a0; }
body[data-ds-dark-theme] #dsh-pet-root .overall .obar { border-color: #2f4558; background: #212f3e; }
body[data-ds-dark-theme] #dsh-pet-root .task { border-color: #2f4558; background: #212f3e; color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .task .tstate { border-color: #2f4558; background: #212f3e; }
body[data-ds-dark-theme] #dsh-pet-root .task.done .tstate { background: #4a90b8; }
body[data-ds-dark-theme] #dsh-pet-root .stat { color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .stat .bar { border-color: #2f4558; background: #212f3e; }
body[data-ds-dark-theme] #dsh-pet-root .xp-row { color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .acts button { background: #212f3e; border-color: #2f4558; color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .acts button:hover { background: #4a90b8; color: #fff; }
body[data-ds-dark-theme] #dsh-pet-root .pc-msg { border-color: #2f4558; }
body[data-ds-dark-theme] #dsh-pet-root .pc-msg.me { background: #212f3e; }
body[data-ds-dark-theme] #dsh-pet-root .pc-msg.pet { background: #212f3e; }
body[data-ds-dark-theme] #dsh-pet-root .pet-talk input { background: #1b2733; border-color: #2f4558; color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .pet-theme-switch button { background: #212f3e; border-color: #2f4558; color: #c8dce8; }
body[data-ds-dark-theme] #dsh-pet-root .pet-theme-switch button.on { background: #4a90b8; color: #fff; }

/* 尾巴召回挂件（挂在 body 上，独立于 root 的 hidden） */
#dsh-pet-tail { position: fixed; right: 0; top: 50%; transform: translateY(-50%); width: 24px; height: 48px; background: #fffdf4; border: 3px solid #7a9a8a; border-right: none; cursor: pointer; z-index: 2147483000; box-shadow: -2px 2px 0 rgba(0,0,0,0.12); }
#dsh-pet-tail svg { width: 18px; height: 36px; margin: 3px auto; display: block; image-rendering: pixelated; }
body[data-ds-dark-theme] #dsh-pet-tail { background: #1b2733; border-color: #2f4558; }
`

/* ===================== Pet DOM ===================== */

const WHALE_SVG = `
<svg viewBox="0 0 16 14" shape-rendering="crispEdges">
  <rect x="12" y="0" width="2" height="2" fill="#3a6a80"/>
  <rect x="13" y="2" width="2" height="2" fill="#4a7a90"/>
  <rect x="12" y="4" width="2" height="2" fill="#4a7a90"/>
  <rect x="4" y="1" width="8" height="2" fill="#4a7a90"/>
  <rect x="2" y="3" width="12" height="2" fill="#5a8aa0"/>
  <rect x="1" y="5" width="14" height="3" fill="#4a7a90"/>
  <rect x="1" y="7" width="13" height="3" fill="#3a6a80"/>
  <rect x="2" y="9" width="11" height="2" fill="#2a5a70"/>
  <rect x="3" y="6" width="9" height="2" fill="#a8d8e8"/>
  <rect x="4" y="7" width="8" height="1" fill="#c8e8f4"/>
  <rect x="3" y="4" width="2" height="2" fill="#ffffff"/>
  <rect x="3" y="4" width="1" height="1" fill="#dfe7ff"/>
  <rect x="5" y="5" width="1" height="2" fill="#2a5a70"/>
  <rect x="0" y="6" width="1" height="2" fill="#4a7a90"/>
</svg>`

const PET_HTML = `
<div class="pet-hp pxfont"><div class="hpb"><i style="width:45%"></i></div><span class="hpv">45%</span></div>
<div class="pet-state pxfont" id="dsh-pet-state">开心</div>
<div style="position:relative">
  <div class="spout"><i></i><i></i><i></i></div>
  <div class="pet-bubble-tmp pxfont" id="dsh-pet-bubble" style="display:none"></div>
  <div class="whale swim" id="dsh-pet-body">${WHALE_SVG}</div>
</div>
<div class="whale-shadow"></div>
<div class="pet-hint pxfont">点我 ↑</div>
<div class="pet-card" id="dsh-pet-card">
  <div class="pc-head"><span class="nm cnfont">蓝鲸「小蓝」</span><button class="cl pxfont" id="dsh-pet-close">✕</button></div>
  <div class="pet-theme-switch pxfont">
    <button id="dsh-pet-theme-day">☀ 白天</button>
    <button id="dsh-pet-theme-night">☾ 黑夜</button>
  </div>
  <div class="pc-tabs pxfont">
    <button class="on" data-tab="p1">养成</button>
    <button data-tab="p2">工作</button>
    <button data-tab="p3">对话</button>
  </div>
  <div class="pc-body">
    <div class="ptab on" id="dsh-pet-p1">
      <div class="xp-row"><span class="lvl pxfont" id="dsh-pet-lvl">幼鲸</span><div class="bar"><i id="dsh-pet-xp" style="width:0%"></i></div></div>
      <div class="stat">心情 <div class="bar"><i id="dsh-pet-mood" style="width:80%"></i></div></div>
      <div class="stat">饱食 <div class="bar"><i id="dsh-pet-food" style="width:55%"></i></div></div>
      <div class="stat">清洁 <div class="bar"><i id="dsh-pet-clean" style="width:90%"></i></div></div>
      <div class="acts">
        <button data-act="feed">喂食</button>
        <button data-act="play">玩耍</button>
        <button data-act="bath">洗澡</button>
      </div>
    </div>
    <div class="ptab" id="dsh-pet-p2">
      <div class="overall">
        <div class="ot"><span>总任务进度</span><span class="op pxfont" id="dsh-pet-overall">45% · 1/3</span></div>
        <div class="obar"><i style="width:45%"></i></div>
        <div class="ol cnfont" id="dsh-pet-overall-tip">蓝鲸正在执行 2 个任务</div>
      </div>
      <div id="dsh-pet-tasks">
        <div class="task doing"><div class="tname"><span>示例任务 A</span><span class="tstate">▶ 65%</span></div><div class="tbar"><i style="width:65%"></i></div></div>
        <div class="task doing"><div class="tname"><span>示例任务 B</span><span class="tstate">思考中</span></div><div class="tbar"><i style="width:20%"></i></div></div>
        <div class="task done"><div class="tname"><span>示例任务 C</span><span class="tstate">✓</span></div><div class="tbar"><i style="width:100%"></i></div></div>
      </div>
    </div>
    <div class="ptab" id="dsh-pet-p3">
      <div class="pet-chat" id="dsh-pet-chat"></div>
      <div class="pet-talk">
        <input id="dsh-pet-input" placeholder="和小蓝鲸说话…">
        <button id="dsh-pet-send">说</button>
      </div>
      <div class="pc-leave"><button id="dsh-pet-leave">让蓝鲸离开 →</button></div>
    </div>
  </div>
</div>`

/* ===================== Pet logic ===================== */

const HINT_KEY = 'dsh-bluewhale:hint-hidden'
const POS_KEY = 'dsh-bluewhale:pos'
const HIDDEN_KEY = 'dsh-bluewhale:hidden'

const LEVELS = [
  { max: 200, name: '幼鲸', petName: '小蓝' },
  { max: 600, name: '少年鲸', petName: '海风' },
  { max: Infinity, name: '成年鲸', petName: '深海' },
]

/** 养成纯逻辑（测试 seam 与 mountPet 共用）。 */
const statsLogic = {
  levelOf(xp) {
    for (const l of LEVELS) if (xp <= l.max) return l
    return LEVELS[LEVELS.length - 1]
  },
  stateOf(s) {
    if (s.food < 30) return '饿了'
    if (s.mood < 25) return '无聊'
    if (s.clean < 20) return '脏兮兮'
    return '开心'
  },
  decay(s) {
    return {
      food: Math.max(10, s.food - 1 / 90),
      mood: Math.max(10, s.mood - 1 / 60),
      clean: Math.max(10, s.clean - 1 / 150),
    }
  },
  /** 亲密度结算：每日上限 200，跨日重置。 */
  addXp(s, amount, today) {
    const daily = s.date === today ? s.dailyXp : 0
    const gain = Math.min(amount, 200 - daily)
    return { xp: Math.min(1000, s.xp + gain), dailyXp: daily + gain, date: today }
  },
}

const CHATS = [
  '主人，任务跑完了哦～', '今天也要加油鸭！', '摸摸我的头嘛～', '我在等你说话呢…',
  '水里好凉快～', '你敲键盘的声音好好听', '主人在偷懒吗？被我发现了！',
  '要不要休息一下？我帮你看着', '哼，都不理我…我生气了！',
]

const REACTS = ['干嘛呀主人～', '别戳我啦！', '嘿嘿，夸我两句？', '我在认真工作呢！', '主人又来找我玩了呀']

const ADVICE = [
  '任务卡住通常是三种原因：① 工具在等确认 ② 模型输出超时 ③ 外部命令挂起。建议先看工具调用记录。',
  '报错三兄弟：路径、版本、权限。把完整报错贴过来，我帮你分析。',
  '需要帮忙吗？我可以：① 拆解任务步骤 ② 检查项目结构 ③ 跑测试验证。',
]

/** 检查是否暗色主题（跟随 DSH 的 data-ds-dark-theme 属性）。 */
function isDark() {
  return typeof document !== 'undefined' && document.body && document.body.hasAttribute('data-ds-dark-theme')
}

/** 向 document.head 注入样式，返回移除函数。 */
function injectStyle(tagId, css) {
  const existing = document.querySelector('style[data-plugin-css="' + tagId + '"]')
  if (existing) return () => {}
  const tag = document.createElement('style')
  tag.dataset.pluginCss = tagId
  tag.textContent = css
  document.head.appendChild(tag)
  return () => tag.remove()
}

/** 挂载宠物 DOM 与全部逻辑，返回清理函数。 */
function mountPet(ctx) {
  // Remove existing pet to prevent duplicates (HMR / effect re-run)
  const old = document.getElementById('dsh-pet-root')
  if (old) old.remove()

  const root = document.createElement('div')
  root.id = 'dsh-pet-root'
  root.innerHTML = PET_HTML
  document.body.appendChild(root)

  const tail = document.createElement('div')
  tail.id = 'dsh-pet-tail'
  tail.style.display = 'none'
  tail.title = '点我唤回小蓝鲸'
  tail.innerHTML = '<svg viewBox="0 0 6 12" shape-rendering="crispEdges"><rect x="1" y="1" width="4" height="10" fill="#58a6c8"/><rect x="2" y="3" width="2" height="2" fill="#8fd47a"/></svg>'
  document.body.appendChild(tail)

  const $ = (id) => root.querySelector('#' + id)
  const bubble = $('dsh-pet-bubble')
  const card = $('dsh-pet-card')
  const body = $('dsh-pet-body')
  const stateEl = $('dsh-pet-state')
  const hp = root.querySelector('.pet-hp')

  const today = () => new Date().toISOString().slice(0, 10)
  const stats = { mood: 80, food: 55, clean: 90, xp: 0, dailyXp: 0, date: today(), asleep: false }
  let stateText = '开心'
  let lastInteract = Date.now()

  function showBubble(text, ms) {
    if (hp) hp.style.display = 'none'
    if (stateEl) stateEl.style.display = 'none'
    bubble.textContent = text
    bubble.style.display = 'block'
    clearTimeout(bubble._t)
    bubble._t = setTimeout(() => {
      bubble.style.display = 'none'
      if (hp) hp.style.display = ''
      if (stateEl) stateEl.style.display = stateEl.textContent === '开心' ? 'none' : ''
    }, ms)
  }

  function renderXp() {
    const cur = statsLogic.levelOf(stats.xp)
    const idx = LEVELS.indexOf(cur)
    const prev = idx > 0 ? LEVELS[idx - 1].max : 0
    const pct = cur.max === Infinity ? 100 : Math.min(100, Math.round(((stats.xp - prev) / (cur.max - prev)) * 100))
    $('dsh-pet-xp').style.width = pct + '%'
    $('dsh-pet-lvl').textContent = cur.name
    root.querySelector('.pc-head .nm').textContent = '蓝鲸「' + cur.petName + '」'
    root.querySelectorAll('.whale').forEach((w) => {
      w.classList.remove('lv0', 'lv1', 'lv2')
      w.classList.add('lv' + idx)
    })
  }

  function updateState(forceHint) {
    if (stats.asleep) return
    const st = statsLogic.stateOf(stats)
    let cls = ''
    let zzz = false
    if (st === '饿了') cls = 'state-hungry'
    else if (st === '脏兮兮') cls = 'state-dirty'
    else if (st === '无聊') { cls = 'state-sleep'; zzz = true }
    body.classList.remove('state-hungry', 'state-dirty', 'state-sleep')
    if (cls) body.classList.add(cls)
    let z = root.querySelector('.zzz')
    if (zzz && !z) { z = document.createElement('span'); z.className = 'zzz'; z.textContent = 'zZ'; body.parentElement.appendChild(z) }
    if (!zzz && z) z.remove()
    stateEl.textContent = st
    stateEl.style.display = st === '开心' ? 'none' : ''
    if ((forceHint || st !== stateText) && st !== '开心') {
      const hints = { '饿了': '肚子咕咕叫…', '脏兮兮': '身上黏黏的…', '无聊': '好无聊啊…' }
      showBubble(hints[st] || st, 2500)
    }
    stateText = st
  }

  function wake() {
    lastInteract = Date.now()
    if (!stats.asleep) return
    stats.asleep = false
    body.classList.remove('state-sleep')
    root.querySelector('.zzz')?.remove()
    showBubble('唔…睡醒了！', 2200)
    updateState(false)
  }

  function togglePet() {
    const hint = root.querySelector('.pet-hint')
    if (hint) { hint.style.display = 'none'; try { localStorage.setItem(HINT_KEY, '1') } catch {} }
    wake()
    card.classList.toggle('open')
    if (!stats.asleep) {
      const b = bubble
      if (b.style.display !== 'block') {
        showBubble(REACTS[Math.floor(Math.random() * REACTS.length)], 2000)
      }
    }
  }

  function act(kind) {
    wake()
    const msgs = { feed: '好好吃！啾～', play: '耶！太好玩啦！', bath: '洗香香咯～' }
    const before = statsLogic.levelOf(stats.xp).name
    const earned = statsLogic.addXp(stats, 10, today())
    stats.xp = earned.xp
    stats.dailyXp = earned.dailyXp
    stats.date = earned.date
    const after = statsLogic.levelOf(stats.xp).name
    if (after !== before) {
      msgs[kind] = after + '！我进化啦！'
      stats.mood = Math.min(100, stats.mood + 15)
    }
    renderXp()
    const wasOpen = card.classList.contains('open')
    card.classList.remove('open')
    body.classList.remove('act-eat', 'act-play', 'act-bath')
    if (kind === 'feed') { stats.food = Math.min(100, stats.food + 25); body.classList.add('act-eat') }
    if (kind === 'play') { stats.mood = Math.min(100, stats.mood + 20); body.classList.add('act-play') }
    if (kind === 'bath') { stats.clean = Math.min(100, stats.clean + 15); body.classList.add('act-bath') }
    $('dsh-pet-mood').style.width = Math.round(stats.mood) + '%'
    $('dsh-pet-food').style.width = Math.round(stats.food) + '%'
    $('dsh-pet-clean').style.width = Math.round(stats.clean) + '%'
    showBubble(msgs[kind], 1700)
    setTimeout(() => {
      body.classList.remove('act-eat', 'act-play', 'act-bath')
      if (wasOpen) card.classList.add('open')
    }, 1700)
    if (kind === 'bath') {
      for (let i = 0; i < 4; i++) {
        const d = document.createElement('i')
        d.className = 'drop'
        d.style.left = (18 + i * 17) + 'px'
        d.style.animationDelay = (i * 0.14) + 's'
        body.appendChild(d)
        setTimeout(() => d.remove(), 1400)
      }
    }
  }

  function updateOverall() {
    const tasks = root.querySelectorAll('#dsh-pet-tasks .task')
    const done = root.querySelectorAll('#dsh-pet-tasks .task.done').length
    const total = Math.max(1, tasks.length)
    const pct = Math.round((done / total) * 100)
    const op = $('dsh-pet-overall')
    if (op) op.textContent = pct + '% · ' + done + '/' + total
    const ob = root.querySelector('.overall .obar i')
    if (ob) ob.style.width = pct + '%'
    const hpv = root.querySelector('.pet-hp .hpv')
    if (hpv) hpv.textContent = pct + '%'
    const hpb = root.querySelector('.pet-hp .hpb i')
    if (hpb) hpb.style.width = pct + '%'
  }

  function addPetChatMsg(text) {
    const list = $('dsh-pet-chat')
    const d = document.createElement('div')
    d.className = 'pc-msg pet cnfont'
    d.textContent = text
    list.appendChild(d)
    list.scrollTop = list.scrollHeight
  }

  function petAdvice() {
    const msg = ADVICE[Math.floor(Math.random() * ADVICE.length)]
    showBubble('（悄悄探头）' + msg.slice(0, 26) + '…', 4000)
    addPetChatMsg(msg)
    wake()
  }

  // ---- 事件绑定 ----
  body.addEventListener('click', togglePet)
  $('dsh-pet-close').addEventListener('click', () => card.classList.remove('open'))
  root.querySelectorAll('.pc-tabs button').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('.pc-tabs button').forEach((b) => b.classList.remove('on'))
      root.querySelectorAll('.ptab').forEach((t) => t.classList.remove('on'))
      btn.classList.add('on')
      $('dsh-pet-' + btn.dataset.tab).classList.add('on')
    })
  })
  root.querySelectorAll('[data-act]').forEach((btn) => {
    btn.addEventListener('click', () => act(btn.dataset.act))
  })
  // ---- LLM pet chat ----
  let petBusy = false
  let petSessionId = null   // 专用会话 ID
  let petSession = null     // 专用会话的 SessionFace 对象

  // 创建宠物专用会话（独立于主界面会话，避免消息出现在主聊天框）
  async function initPetSession() {
    if (!ctx.sessions) {
      console.warn('[dsh-bluewhale-pet] sessions service not available')
      return false
    }
    try {
      // ctx.sessions 在运行时是 SessionRuntime 实例，包含 create() 方法
      const runtime = ctx.sessions
      if (typeof runtime.create !== 'function') {
        console.warn('[dsh-bluewhale-pet] sessions.create() not available')
        return false
      }
      const sid = await runtime.create()
      const binding = runtime.binding(sid)
      if (!binding) {
        console.warn('[dsh-bluewhale-pet] binding failed for pet session', sid)
        return false
      }
      petSessionId = sid
      petSession = binding.session
      console.log('[dsh-bluewhale-pet] pet session created:', sid)
      return true
    } catch (e) {
      console.warn('[dsh-bluewhale-pet] pet session create error:', e)
      return false
    }
  }

  // 延迟初始化专用会话（等 sessions 服务就绪后再创建）
  let sessionInited = false
  async function ensurePetSession() {
    if (sessionInited) return !!petSession
    sessionInited = true
    return await initPetSession()
  }

  async function sendPetMsg() {
    const input = $('dsh-pet-input')
    const v = input.value.trim()
    if (!v || petBusy) return
    const list = $('dsh-pet-chat')
    const d = document.createElement('div')
    d.className = 'pc-msg me cnfont'
    d.textContent = v
    list.appendChild(d)
    list.scrollTop = list.scrollHeight
    input.value = ''

    // Show thinking indicator
    const thinkEl = document.createElement('div')
    thinkEl.className = 'pc-msg pet cnfont'
    thinkEl.textContent = '思考中...'
    thinkEl.id = 'pet-thinking'
    list.appendChild(thinkEl)
    list.scrollTop = list.scrollHeight
    petBusy = true
    wake()

    try {
      // 确保专用会话已创建
      const hasSession = await ensurePetSession()
      if (!hasSession || !petSession) {
        thinkEl.textContent = '会话服务不可用，请确认 DSH 版本支持～'
        petBusy = false
        return
      }

      const session = petSession

      // Build prompt with pet personality
      const PET_PROMPT = '请以"蓝鲸"（一只可爱的像素风蓝鲸宠物）的口吻简短回答，用中文，语气活泼可爱，可以加颜文字，回答控制在3句话以内。用户说：'
      const result = await session.prompt([{ type: 'text', text: PET_PROMPT + v }], 'queue')

      if (!result.ok) {
        thinkEl.textContent = '发送失败了～ ' + (result.error?.message || '未知错误')
        petBusy = false
        return
      }

      // Listen for assistant response via session snapshot
      let prevNodeCount = session.getSnapshot().chat.legacy.nodes.length
      let responded = false

      const unsub = session.subscribe(() => {
        try {
          const snap = session.getSnapshot()
          const nodes = snap.chat.legacy.nodes

          // Check for new assistant nodes (kind='assistant', blocks=[{kind:'text',text:'...'}])
          for (let i = prevNodeCount; i < nodes.length; i++) {
            const node = nodes[i]
            if (node.kind === 'assistant') {
              const textBlocks = (node.blocks || []).filter(b => b.kind === 'text')
              const text = textBlocks.map(b => b.text).join('')
              if (text) {
                thinkEl.textContent = ''
                addPetChatMsg(text)
                responded = true
              }
            }
          }
          prevNodeCount = nodes.length

          // Also check streaming partial (partial.blocks, not partial.text)
          if (snap.chat.legacy.partial) {
            const pBlocks = snap.chat.legacy.partial.blocks || []
            const pText = pBlocks.filter(b => b.kind === 'text').map(b => b.text).join('')
            if (pText) {
              thinkEl.textContent = pText
              list.scrollTop = list.scrollHeight
            }
          }

          // Done when turn ends and no partial
          const hasRunning = snap.chat.legacy.runningCalls && snap.chat.legacy.runningCalls.length > 0
          if (!snap.chat.legacy.partial && !hasRunning) {
            unsub()
            if (!responded) {
              // Final check: scan all new nodes one more time
              const allNodes = session.getSnapshot().chat.legacy.nodes
              for (let i = 0; i < allNodes.length; i++) {
                const n = allNodes[i]
                if (n.kind === 'assistant') {
                  const tb = (n.blocks || []).filter(b => b.kind === 'text')
                  const t = tb.map(b => b.text).join('')
                  if (t) { addPetChatMsg(t); responded = true; break }
                }
              }
              if (!responded) thinkEl.textContent = '我好像走神了，再问一次吧～'
            }
            petBusy = false
          }
        } catch (e) {
          console.warn('[dsh-bluewhale-pet] subscribe error:', e)
        }
      })

      // Timeout safety: auto-release after 60s
      setTimeout(() => {
        if (petBusy) {
          unsub()
          if (!responded) thinkEl.textContent = '思考太久啦，下次再聊～'
          petBusy = false
        }
      }, 60000)

    } catch (e) {
      thinkEl.textContent = '出错了～ ' + (e.message || '')
      petBusy = false
    }
  }
  $('dsh-pet-send').addEventListener('click', sendPetMsg)
  $('dsh-pet-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendPetMsg() })
  $('dsh-pet-leave').addEventListener('click', () => {
    try { localStorage.setItem(HIDDEN_KEY, '1') } catch {}
    root.classList.add('hidden')
    tail.style.display = 'block'
  })
  // 主题切换
  function setPetTheme(night) {
    try { localStorage.setItem('dsh-bluewhale:theme', night ? 'night' : 'day') } catch {}
    if (ctx && ctx.theme) {
      try { ctx.theme.setTheme(night ? 'sunny-pixel-dark' : 'sunny-pixel') } catch {}
    }
    $('dsh-pet-theme-day').classList.toggle('on', !night)
    $('dsh-pet-theme-night').classList.toggle('on', night)
  }
  $('dsh-pet-theme-day').addEventListener('click', () => setPetTheme(false))
  $('dsh-pet-theme-night').addEventListener('click', () => setPetTheme(true))

  // ---- 拖动 + 位置记忆 ----
  let dragging = false, sx = 0, sy = 0
  root.addEventListener('mousedown', (e) => {
    if (e.target.closest('.pet-card') || e.target.closest('.pet-talk') || e.target.closest('.pet-theme-switch')) return
    dragging = true
    sx = e.clientX - root.offsetLeft
    sy = e.clientY - root.offsetTop
    e.preventDefault()
  })
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return
    const x = Math.max(0, Math.min(window.innerWidth - root.offsetWidth, e.clientX - sx))
    const y = Math.max(0, Math.min(window.innerHeight - root.offsetHeight, e.clientY - sy))
    root.style.left = x + 'px'
    root.style.right = 'auto'
    root.style.top = y + 'px'
    root.style.bottom = 'auto'
  })
  document.addEventListener('mouseup', () => {
    if (dragging) {
      try { localStorage.setItem(POS_KEY, root.style.left + ',' + root.style.top) } catch {}
    }
    dragging = false
  })

  // ---- 恢复状态 ----
  try {
    const pos = localStorage.getItem(POS_KEY)
    if (pos) {
      const [x, y] = pos.split(',')
      root.style.left = x; root.style.right = 'auto'
      root.style.top = y; root.style.bottom = 'auto'
    }
    if (localStorage.getItem(HIDDEN_KEY)) root.classList.add('hidden')
    if (localStorage.getItem(HIDDEN_KEY)) tail.style.display = 'block'
    if (localStorage.getItem(HINT_KEY)) root.querySelector('.pet-hint').style.display = 'none'
    const savedTheme = localStorage.getItem('dsh-bluewhale:theme')
    if (savedTheme === 'night') setPetTheme(true)
    else if (savedTheme === 'day') setPetTheme(false)
    else setPetTheme(isDark())
  } catch {}
  tail.addEventListener('click', () => {
    try { localStorage.removeItem(HIDDEN_KEY) } catch {}
    root.classList.remove('hidden')
    tail.style.display = 'none'
    wake()
  })

  // ---- 定时器 ----
  const decayTimer = setInterval(() => {
    const next = statsLogic.decay(stats)
    stats.food = next.food
    stats.clean = next.clean
    stats.mood = next.mood
    $('dsh-pet-food').style.width = Math.round(stats.food) + '%'
    $('dsh-pet-clean').style.width = Math.round(stats.clean) + '%'
    $('dsh-pet-mood').style.width = Math.round(stats.mood) + '%'
    updateState(false)
  }, 2000)

  const chatTimer = setInterval(() => {
    if (stats.asleep) return
    if (Math.random() > 0.4) return
    if (bubble.style.display === 'block') return
    showBubble(CHATS[Math.floor(Math.random() * CHATS.length)], 3000)
  }, 16000)

  const sleepTimer = setInterval(() => {
    if (!stats.asleep && Date.now() - lastInteract > 25000) {
      stats.asleep = true
      body.classList.remove('state-hungry', 'state-dirty')
      body.classList.add('state-sleep')
      let z = root.querySelector('.zzz')
      if (!z) { z = document.createElement('span'); z.className = 'zzz'; z.textContent = 'zZ'; body.parentElement.appendChild(z) }
      stateEl.textContent = '睡觉'
      stateEl.style.display = ''
    }
  }, 3000)

  // 示例任务自动推进（agent 接入后替换为真实任务订阅）
  const taskTimer = setInterval(() => {
    const task = root.querySelector('#dsh-pet-tasks .task.doing')
    if (!task) return
    const bar = task.querySelector('.tbar i')
    const st = task.querySelector('.tstate')
    const nm = task.querySelector('.tname span')
    const cur = parseFloat(bar.style.width) || 20
    const next = cur + 9
    if (next >= 100) {
      bar.style.width = '100%'
      st.textContent = '✓ 完成'
      task.classList.add('done')
      task.classList.remove('doing')
      if (stats.asleep) wake()
      showBubble('任务完成啦！「' + (nm ? nm.textContent : '') + '」✓', 3200)
      const hpb = root.querySelector('.pet-hp .hpb i')
      if (hpb) { hpb.classList.add('flash'); setTimeout(() => hpb.classList.remove('flash'), 1300) }
      updateOverall()
    } else {
      bar.style.width = next + '%'
      st.textContent = '▶ ' + Math.round(next) + '%'
    }
  }, 4200)

  // 隐藏大佬：监听主题事件同步暗色（迷你 agent 接入后扩展为会话观察）
  const onThemeChange = () => {
    if (!localStorage.getItem('dsh-bluewhale:theme')) setPetTheme(isDark())
  }
  if (ctx && ctx.on) ctx.on('theme/change', onThemeChange)

  renderXp()
  updateState(true)
  updateOverall()

  // ---- 清理 ----
  return () => {
    clearInterval(decayTimer)
    clearInterval(chatTimer)
    clearInterval(sleepTimer)
    clearInterval(taskTimer)
    if (ctx && ctx.off) ctx.off('theme/change', onThemeChange)
    tail.remove()
    root.remove()
  }
}

/* ===================== Plugin ===================== */

/**
 * Client plugin body: register the pixel themes, inject the stylesheet, and
 * mount the companion pet. All registrations are effects — uninstalling the
 * plugin removes themes, styles, timers, and the pet DOM.
 * @param ctx - client cordis context.
 */
function apply(ctx) {
  console.log('[dsh-bluewhale-pet] apply() start')

  // Override theme tokens (wrapped in try-catch so a token error won't block pet mount)
  try {
    const overrides = {}
    const allKeys = new Set([...Object.keys(LIGHT_TOKENS), ...Object.keys(DARK_TOKENS)])
    for (const k of allKeys) {
      overrides[k] = { light: LIGHT_TOKENS[k] || '', dark: DARK_TOKENS[k] || '' }
    }
    ctx.effect(() => {
      try { ctx.theme.overrideTokens('dsh-bluewhale-pet', overrides) } catch (e) {
        console.warn('[dsh-bluewhale-pet] overrideTokens failed:', e)
      }
    }, 'dsh-bluewhale-pet: token override')
    console.log('[dsh-bluewhale-pet] overrideTokens registered:', allKeys.size, 'tokens')
  } catch (e) {
    console.warn('[dsh-bluewhale-pet] token setup error:', e)
  }

  let cleanup = () => {}
  ctx.effect(() => {
    console.log('[dsh-bluewhale-pet] mounting pet...')
    const removeStyle = injectStyle('dsh-bluewhale-pet', CSS)
    console.log('[dsh-bluewhale-pet] style injected, mounting DOM...')
    cleanup = mountPet(ctx)
    console.log('[dsh-bluewhale-pet] pet mounted OK')
    return () => {
      cleanup()
      removeStyle()
    }
  }, 'dsh-bluewhale-pet: pet mount')
}

    if (typeof window !== 'undefined' && window.__DSH_WHALE_TEST__) {
      window.__DSH_WHALE_TEST__.apply = apply
      window.__DSH_WHALE_TEST__.statsLogic = statsLogic
    }
    return { inject: ['theme', 'sessions'], apply }
  }
})
