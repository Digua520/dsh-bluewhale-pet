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
  '--dsw-static-deepseek-500': '#2a9d8f',
  '--dsw-static-deepseek-400': '#40c8a8',
  '--dsw-static-deepseek-450': '#35b89c',
  '--dsw-static-deepseek-200': '#b8e8d8',
  '--dsw-static-blue-450': '#40c8a8',
  '--dsw-static-blue-500': '#2a9d8f',
  '--dsw-static-neutral-bluish-400': '#6a9a80',
  '--dsw-alias-bg-base': '#f0ead0',
  '--dsw-alias-bg-layer-1': '#f5f0dc',
  '--dsw-alias-bg-layer-2': '#e8e0c4',
  '--dsw-alias-bg-layer-3': '#dcd4b0',
  '--dsw-alias-bg-overlay': '#f5f0dc',
  '--dsw-alias-bg-mask-1': 'rgba(42, 80, 60, 0.18)',
  '--dsw-alias-bg-mask-2': 'rgba(42, 80, 60, 0.10)',
  '--dsw-alias-bg-mask-3': 'rgba(42, 80, 60, 0.40)',
  '--dsw-alias-bg-module-platform': '#e0d8b8',
  '--dsw-alias-bg-multi-select': '#e0d8b8',
  '--dsw-alias-bg-skeleton': 'rgba(42, 80, 60, 0.08)',
  '--dsw-alias-border-l1': 'rgba(42, 80, 60, 0.30)',
  '--dsw-alias-border-l2': 'rgba(42, 80, 60, 0.50)',
  '--dsw-alias-border-l3': 'rgba(42, 80, 60, 0.65)',
  '--dsw-alias-border-l4': 'rgba(42, 80, 60, 0.80)',
  '--dsw-alias-label-primary': '#1a3a2a',
  '--dsw-alias-label-secondary': '#2a5a3a',
  '--dsw-alias-label-tertiary': '#4a7a5a',
  '--dsw-alias-label-caption': '#5a8a6a',
  '--dsw-alias-label-dimmed': '#7a9a7a',
  '--dsw-alias-brand-primary': '#2a9d8f',
  '--dsw-alias-brand-text': '#ffffff',
  '--dsw-alias-button-primary-hover': '#228a7e',
  '--dsw-alias-button-primary-dimmed': '#d0e8e0',
  '--dsw-alias-button-elevated-fill': '#f5f0dc',
  '--dsw-alias-button-floating-fill': '#f5f0dc',
  '--dsw-alias-button-floating-hover': '#e8e0c4',
  '--dsw-alias-button-ghost-active-border': '#a0c8b0',
  '--dsw-alias-button-ghost-active-fill': '#d0e8e0',
  '--dsw-alias-button-ghost-active-hover': '#c0dcd0',
  '--dsw-alias-state-business-primary': '#2a9d8f',
  '--dsw-alias-state-business-tertiary': '#d0e8e0',
  '--dsw-alias-state-error-primary': '#c04040',
  '--dsw-alias-state-error-secondary': '#c04040',
  '--dsw-alias-state-success-primary': '#3a9060',
  '--dsw-alias-state-success-secondary': '#3a9060',
  '--dsw-alias-state-success-tertiary': '#c0e8d0',
  '--dsw-alias-state-warn-label': '#8a6020',
  '--dsw-alias-state-warn-primary': '#c89030',
  '--dsw-alias-state-warn-secondary': '#c89030',
  '--dsw-alias-state-warn-tertiary': '#f0d8a0',
  '--dsw-alias-interactive-bg-hover': 'rgba(42, 157, 143, 0.12)',
  '--dsw-alias-interactive-bg-active': 'rgba(42, 157, 143, 0.22)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgba(42, 157, 143, 0.18)',
  '--dsw-alias-interactive-bg-hover-danger': 'rgba(192, 64, 64, 0.10)',
  '--dsw-alias-interactive-bg-hover-solid': '#d0e8e0',
  '--dsw-alias-markdown-code-block': '#e0d8b8',
  '--dsw-alias-markdown-code-block-banner': '#e0d8b8',
  '--dsw-alias-markdown-code-segment-selected': '#f5f0dc',
  '--dsw-alias-markdown-code-segment-unselected': '#e8e0c4',
  '--dsw-alias-markdown-citation': '#d0e8e0',
  '--dsw-alias-markdown-inline-code': '#d0e8e0',
  '--dsw-alias-markdown-placeholder': '#d0e8e0',
  '--dsw-alias-markdown-tag': '#d0e8e0',
  '--dsw-alias-toast-bg': '#dcd4b0',
  '--dsw-alias-tooltip-bg': '#c8c0a0',
  '--dsw-specific-sidebar-fill': '#d8d0a8',
  '--dsw-specific-sidebar-nav-item-active': '#b8c898',
  '--dsw-specific-sidebar-nav-item-active-accent': 'rgba(42, 157, 143, 0.25)',
  '--dsw-specific-sidebar-nav-item-hover': '#c8c0a0',
  '--dsw-specific-bubble': '#f5f0dc',
  '--dsw-specific-bubble-highlight': '#c8e8c0',
  '--dsw-specific-input-major': '#ffffff',
  '--dsw-specific-login-input': '#e8e0c4',
  '--dsw-specific-menu': '#f5f0dc',
  '--dsw-specific-selector': '#dcd4b0',
  '--dsw-specific-tip': '#d0e8e0',
  '--dsw-alias-separator-primary': 'rgba(42, 157, 143, 0.35)',
  '--dsw-alias-scrollbar-bg-l1': '#c8c0a0',
  '--dsw-alias-scrollbar-bg-l2': '#b8b090',
  '--dsw-alias-scrollbar-hover-l1': '#a8a080',
  '--dsw-alias-scrollbar-hover-l2': '#a8a080',
  '--dsw-alias-bg-mask-photo': 'rgba(26, 58, 42, 0.88)',
  '--dsw-alias-bg-mask-drop': 'rgba(245, 240, 220, 0.7)',
  '--dsw-alias-border-inverted2': 'rgba(0, 0, 0, 0)',
  '--dsw-alias-border-inverted': 'rgba(0, 0, 0, 0)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgba(42, 80, 60, 0.25)',
  '--dsw-alias-brand-primary-invert': '#ffffff',
  '--dsw-alias-brand-primary-new-colorprimary-new-color': '#2a9d8f',
  '--dsw-alias-button-contrast-fill': '#4a7a5a',
  '--dsw-alias-button-info-fill': '#2a9d8f',
  '--dsw-alias-button-info-hover': '#40c8a8',
  '--dsw-alias-button-primary-fill': '#2a9d8f',
  '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(42, 80, 60, 0.36)',
  '--dsw-alias-button-tool-bar-fill': 'rgba(42, 80, 60, 0.5)',
  '--dsw-alias-button-tool-bar-hover': 'rgba(42, 80, 60, 0.6)',
  '--dsw-alias-label-primary-bluish': '#2a7a9d',
  '--dsw-alias-label-primary-dimmed': '#2a5a3a',
  '--dsw-alias-label-primary-foreground': '#ffffff',
  '--dsw-alias-label-primary-inverted': '#ffffff',
  '--shiki-foreground': '#1a3a2a',
  '--shiki-background': '#eef4e8',
  '--shiki-token-constant': '#b88030',
  '--shiki-token-string': '#5aa878',
  '--shiki-token-comment': '#9ab8a8',
  '--shiki-token-keyword': '#7ab8a8',
  '--shiki-token-parameter': '#d87070',
  '--shiki-token-function': '#6a98b8',
  '--shiki-token-string-expression': '#5aa878',
  '--shiki-token-punctuation': '#8aa89a',
  '--shiki-token-link': '#6a98b8',
}

const DARK_TOKENS = {
  '--dsw-static-deepseek-500': '#40c8a8',
  '--dsw-static-deepseek-400': '#58d8b8',
  '--dsw-static-deepseek-450': '#40c8a8',
  '--dsw-static-deepseek-200': '#1a3a30',
  '--dsw-static-blue-450': '#58d8b8',
  '--dsw-static-blue-500': '#40c8a8',
  '--dsw-static-neutral-bluish-400': '#5a8a70',
  '--dsw-alias-bg-base': '#0a1810',
  '--dsw-alias-bg-layer-1': '#102818',
  '--dsw-alias-bg-layer-2': '#163020',
  '--dsw-alias-bg-layer-3': '#1c3828',
  '--dsw-alias-bg-overlay': '#102818',
  '--dsw-alias-bg-mask-1': 'rgba(0, 0, 0, 0.55)',
  '--dsw-alias-bg-mask-2': 'rgba(0, 0, 0, 0.30)',
  '--dsw-alias-bg-mask-3': 'rgba(0, 0, 0, 0.70)',
  '--dsw-alias-bg-module-platform': '#163020',
  '--dsw-alias-bg-multi-select': '#163020',
  '--dsw-alias-bg-skeleton': 'rgba(64, 200, 168, 0.06)',
  '--dsw-alias-border-l1': 'rgba(64, 200, 168, 0.15)',
  '--dsw-alias-border-l2': 'rgba(64, 200, 168, 0.25)',
  '--dsw-alias-border-l3': 'rgba(64, 200, 168, 0.35)',
  '--dsw-alias-border-l4': 'rgba(64, 200, 168, 0.50)',
  '--dsw-alias-label-primary': '#c8e8d8',
  '--dsw-alias-label-secondary': '#90b8a0',
  '--dsw-alias-label-tertiary': '#70a088',
  '--dsw-alias-label-caption': '#70a088',
  '--dsw-alias-label-dimmed': '#508068',
  '--dsw-alias-brand-primary': '#40c8a8',
  '--dsw-alias-brand-text': '#0a1810',
  '--dsw-alias-button-primary-hover': '#58d8b8',
  '--dsw-alias-button-primary-dimmed': '#163020',
  '--dsw-alias-button-elevated-fill': '#163020',
  '--dsw-alias-button-floating-fill': '#163020',
  '--dsw-alias-button-floating-hover': '#1c3828',
  '--dsw-alias-button-ghost-active-border': '#2a5840',
  '--dsw-alias-button-ghost-active-fill': '#163020',
  '--dsw-alias-button-ghost-active-hover': '#1c3828',
  '--dsw-alias-state-business-primary': '#40c8a8',
  '--dsw-alias-state-business-tertiary': '#163020',
  '--dsw-alias-state-error-primary': '#e87070',
  '--dsw-alias-state-error-secondary': '#e87070',
  '--dsw-alias-state-success-primary': '#40c8a8',
  '--dsw-alias-state-success-secondary': '#40c8a8',
  '--dsw-alias-state-success-tertiary': '#163020',
  '--dsw-alias-state-warn-label': '#e0c060',
  '--dsw-alias-state-warn-primary': '#d8b048',
  '--dsw-alias-state-warn-secondary': '#d8b048',
  '--dsw-alias-state-warn-tertiary': '#2a2810',
  '--dsw-alias-interactive-bg-hover': 'rgba(64, 200, 168, 0.10)',
  '--dsw-alias-interactive-bg-active': 'rgba(64, 200, 168, 0.20)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgba(64, 200, 168, 0.15)',
  '--dsw-alias-interactive-bg-hover-danger': 'rgba(232, 112, 112, 0.12)',
  '--dsw-alias-interactive-bg-hover-solid': '#1c3828',
  '--dsw-alias-markdown-code-block': '#0e2018',
  '--dsw-alias-markdown-code-block-banner': '#163020',
  '--dsw-alias-markdown-code-segment-selected': '#102818',
  '--dsw-alias-markdown-code-segment-unselected': '#163020',
  '--dsw-alias-markdown-citation': '#163020',
  '--dsw-alias-markdown-inline-code': '#163020',
  '--dsw-alias-markdown-placeholder': '#163020',
  '--dsw-alias-markdown-tag': '#163020',
  '--dsw-alias-toast-bg': '#1c3828',
  '--dsw-alias-tooltip-bg': '#244030',
  '--dsw-specific-sidebar-fill': '#0e2018',
  '--dsw-specific-sidebar-nav-item-active': '#2a5840',
  '--dsw-specific-sidebar-nav-item-active-accent': 'rgba(64, 200, 168, 0.25)',
  '--dsw-specific-sidebar-nav-item-hover': '#1c3828',
  '--dsw-specific-bubble': '#102818',
  '--dsw-specific-bubble-highlight': '#1a4030',
  '--dsw-specific-input-major': '#102818',
  '--dsw-specific-login-input': '#163020',
  '--dsw-specific-menu': '#102818',
  '--dsw-specific-selector': '#1c3828',
  '--dsw-specific-tip': '#163020',
  '--dsw-alias-separator-primary': 'rgba(64, 200, 168, 0.25)',
  '--dsw-alias-scrollbar-bg-l1': '#244030',
  '--dsw-alias-scrollbar-bg-l2': '#2a5840',
  '--dsw-alias-scrollbar-hover-l1': '#386050',
  '--dsw-alias-scrollbar-hover-l2': '#386050',
  '--dsw-alias-bg-mask-photo': 'rgba(0, 0, 0, 0.88)',
  '--dsw-alias-bg-mask-drop': 'rgba(16, 40, 24, 0.7)',
  '--dsw-alias-border-inverted2': 'rgba(200, 232, 216, 0.08)',
  '--dsw-alias-border-inverted': 'rgba(200, 232, 216, 0.06)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgba(200, 232, 216, 0.06)',
  '--dsw-alias-brand-primary-invert': '#0a1810',
  '--dsw-alias-brand-primary-new-colorprimary-new-color': '#40c8a8',
  '--dsw-alias-button-contrast-fill': '#90b8a0',
  '--dsw-alias-button-info-fill': '#58d8b8',
  '--dsw-alias-button-info-hover': '#40c8a8',
  '--dsw-alias-button-primary-fill': '#40c8a8',
  '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(64, 100, 80, 0.36)',
  '--dsw-alias-button-tool-bar-fill': 'rgba(64, 100, 80, 0.5)',
  '--dsw-alias-button-tool-bar-hover': 'rgba(64, 100, 80, 0.6)',
  '--dsw-alias-label-primary-bluish': '#90c8d8',
  '--dsw-alias-label-primary-dimmed': '#a0c8b8',
  '--dsw-alias-label-primary-foreground': '#0a1810',
  '--dsw-alias-label-primary-inverted': '#1c3828',
  '--shiki-foreground': '#d8e8e0',
  '--shiki-background': '#1c2622',
  '--shiki-token-constant': '#e0b860',
  '--shiki-token-string': '#8fd47a',
  '--shiki-token-comment': '#6a8a7c',
  '--shiki-token-keyword': '#7ab8a8',
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
#dsh-pet-root .pxfont { font-family: 'Courier New', Consolas, monospace; font-weight: bold; -webkit-font-smoothing: none; }
#dsh-pet-root .cnfont { font-family: 'SimSun', 'NSimSun', serif; font-weight: bold; -webkit-font-smoothing: none; }

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
#dsh-pet-root .whale { width: 96px; height: 84px; image-rendering: pixelated; position: relative; }
#dsh-pet-root .whale svg { width: 100%; height: 100%; }
#dsh-pet-root .whale.swim { animation: dshpet-swim 2.6s ease-in-out infinite; }
@keyframes dshpet-swim { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
#dsh-pet-root .spout { position: absolute; top: -14px; left: 38px; display: flex; gap: 2px; }
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
body[data-ds-dark-theme] #dsh-pet-root .pet-hint { background: #202c28; border-color: #3a5048; color: #a8c0b4; }
body[data-ds-dark-theme] #dsh-pet-root .pet-hp .hpb { border-color: #3a5048; background: #2a3c34; }
body[data-ds-dark-theme] #dsh-pet-root .pet-hp .hpv { color: #a8c0b4; }
body[data-ds-dark-theme] #dsh-pet-root .pet-card { background: #202c28; border-color: #3a5048; box-shadow: 4px 4px 0 rgba(0,0,0,0.4); }
body[data-ds-dark-theme] #dsh-pet-root .pc-head { background: linear-gradient(180deg, #3a5850, #2a443c); border-color: #2a3a34; }
body[data-ds-dark-theme] #dsh-pet-root .pc-tabs { border-color: #3a5048; }
body[data-ds-dark-theme] #dsh-pet-root .pc-tabs button { background: #2a3c34; color: #a8c0b4; border-color: #3a5048; }
body[data-ds-dark-theme] #dsh-pet-root .pc-tabs button.on { background: #3a7848; color: #fff; }
body[data-ds-dark-theme] #dsh-pet-root .overall { border-color: #3a5048; background: #25332e; }
body[data-ds-dark-theme] #dsh-pet-root .overall .ot { color: #d8e8e0; }
body[data-ds-dark-theme] #dsh-pet-root .overall .ol { color: #6a8a7c; }
body[data-ds-dark-theme] #dsh-pet-root .overall .obar { border-color: #3a5048; background: #2a3c34; }
body[data-ds-dark-theme] #dsh-pet-root .task { border-color: #3a5048; background: #25332e; color: #d8e8e0; }
body[data-ds-dark-theme] #dsh-pet-root .task .tstate { border-color: #3a5048; background: #2a3c34; }
body[data-ds-dark-theme] #dsh-pet-root .task.done .tstate { background: #3a7848; }
body[data-ds-dark-theme] #dsh-pet-root .stat { color: #d8e8e0; }
body[data-ds-dark-theme] #dsh-pet-root .stat .bar { border-color: #3a5048; background: #2a3c34; }
body[data-ds-dark-theme] #dsh-pet-root .xp-row { color: #d8e8e0; }
body[data-ds-dark-theme] #dsh-pet-root .acts button { background: #25332e; border-color: #3a5048; color: #a8c0b4; }
body[data-ds-dark-theme] #dsh-pet-root .acts button:hover { background: #3a7848; color: #fff; }
body[data-ds-dark-theme] #dsh-pet-root .pc-msg { border-color: #3a5048; }
body[data-ds-dark-theme] #dsh-pet-root .pc-msg.me { background: #25332e; }
body[data-ds-dark-theme] #dsh-pet-root .pc-msg.pet { background: #2a3c34; }
body[data-ds-dark-theme] #dsh-pet-root .pet-talk input { background: #202c28; border-color: #3a5048; color: #d8e8e0; }
body[data-ds-dark-theme] #dsh-pet-root .pet-theme-switch button { background: #2a3c34; border-color: #3a5048; color: #a8c0b4; }
body[data-ds-dark-theme] #dsh-pet-root .pet-theme-switch button.on { background: #3a7848; color: #fff; }
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
  { max: 30, name: '幼鲸', petName: '小蓝' },
  { max: 60, name: '少年鲸', petName: '海风' },
  { max: Infinity, name: '成年鲸', petName: '深海' },
]

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

  const $ = (id) => root.querySelector('#' + id)
  const bubble = $('dsh-pet-bubble')
  const card = $('dsh-pet-card')
  const body = $('dsh-pet-body')
  const stateEl = $('dsh-pet-state')
  const hp = root.querySelector('.pet-hp')

  const stats = { mood: 80, food: 55, clean: 90, xp: 0, asleep: false }
  let stateText = '开心'
  let lastInteract = Date.now()

  const levelOf = (xp) => LEVELS.findIndex((l) => xp < l.max)

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
    const lv = levelOf(stats.xp)
    const cur = LEVELS[lv]
    const prev = lv > 0 ? LEVELS[lv - 1].max : 0
    const pct = cur.max === Infinity ? 100 : Math.min(100, Math.round(((stats.xp - prev) / (cur.max - prev)) * 100))
    $('dsh-pet-xp').style.width = pct + '%'
    $('dsh-pet-lvl').textContent = cur.name
    root.querySelector('.pc-head .nm').textContent = '蓝鲸「' + cur.petName + '」'
  }

  function updateState(forceHint) {
    if (stats.asleep) return
    let st = '开心'
    let cls = ''
    let zzz = false
    if (stats.food < 35) { st = '饿了'; cls = 'state-hungry' }
    else if (stats.clean < 35) { st = '脏兮兮'; cls = 'state-dirty' }
    else if (stats.mood < 35) { st = '无聊'; cls = 'state-sleep'; zzz = true }
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
    const before = levelOf(stats.xp)
    stats.xp = Math.min(100, stats.xp + 10)
    const after = levelOf(stats.xp)
    if (after > before) {
      msgs[kind] = LEVELS[after].name + '！我进化啦！'
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
    if (localStorage.getItem(HINT_KEY)) root.querySelector('.pet-hint').style.display = 'none'
    const savedTheme = localStorage.getItem('dsh-bluewhale:theme')
    if (savedTheme === 'night') setPetTheme(true)
    else if (savedTheme === 'day') setPetTheme(false)
    else setPetTheme(isDark())
  } catch {}

  // ---- 定时器 ----
  const decayTimer = setInterval(() => {
    stats.food = Math.max(10, stats.food - 1.2)
    stats.clean = Math.max(10, stats.clean - 0.9)
    stats.mood = Math.max(10, stats.mood - 0.7)
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

    return { inject: ['theme', 'sessions'], apply }
  }
})
