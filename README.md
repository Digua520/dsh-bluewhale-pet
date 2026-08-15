# dsh-bluewhale-pet 🐳

DSH 插件：像素蓝鲸陪伴宠物（蓝鲸陪伴 + DeepSeek HARNESS）——sunny-pixel 双主题、三级反射弧对话、QQ 宠物式养成、主屏求助侦测。

## 功能

- **主题**：sunny-pixel（白天）/ sunny-pixel-dark（黑夜）双主题，宫崎骏式自然像素风，双注册 + 面板内一键切换 + 跟随系统
- **三级反射弧对话**：
  - 1级本地反射（0ms）：问候 / 状态查询 / 互动 / 闲聊 / 求助 7 意图模板池
  - 2级极速闲聊（≤3s）：host 端 `/bluewhale-pet` RPC 通道 → `ctx.llm.stream`（deepseek-chat 非思考，maxTokens 60）
  - 3级深度委派（异步）：即时回执「开始潜水处理」+ 任务卡 + 头顶进度条 + 完成播报（v1 假管线，v1.x 接真 subagent）
- **养成**：饱食/心情/清洁三属性（时间衰减 + 投喂/玩耍/洗澡）、亲密度三形态（幼鲸「小蓝」→ 少年鲸「海风」→ 成年鲸「深海」）、25s 睡眠、拖动记忆、尾巴召回
- **Ambient Observer**：主屏「卡住/报错/求助」信号侦测，探头三连——不点【排查】绝不注入主聊天流
- **数据飞轮**：对话路由日志（localStorage 环形 200 条），为词表调优提供数据

## 安装

```bash
dsh plugin --profile web add ./dsh-bluewhale-pet
```

## 开发

```bash
npm install
npm test          # vitest + jsdom，33 个测试
```

## 架构

- `lib/client.js` — 浏览器 bundle（主题注册 + 宠物 UI + 三级反射弧 + 观察器，纯 DOM 无框架）
- `lib/index.js` — host 半（`/bluewhale-pet` RPC 通道 + host LLM 直调，插件不接触 API key）
- 全部注册为 cordis effect，卸载零残留

## 设计文档

- 架构规范：`docs/superpowers/specs/2026-08-15-dsh-bluewhale-pet-design-v2.md`（仓库外）
- v1 简化清单见设计文档 §12.1（unary RPC 无流式、假管线串行、任务卡取消按钮与 ⚙️设置按钮后置等）
