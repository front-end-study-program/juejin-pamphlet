# 前端调试通关秘籍

代码在某个平台运行，把运行时的状态通过某种方式暴露出来，传递给开发工具做 UI 的展示和交互，辅助开发者排查问题、梳理流程、了解代码运行状态等，这个就是调试。

## Chrome Debugger 原理

分为两个部分：

- backend - 负责把 Chrome 的网页运行时状态通过调试协议暴露出来
- frontend - 负责对接调试协议，做 UI 的展示和交互

两者之间的调试协议叫做 CDP

frontend、backend、调试协议（CDP）、信道（ws、Chrome 插件的 background 转发），这是 Chrome DevTools 的 4 个组成部分

## VScode Debugger 原理

VSCode Debugger 的原理和 Chrome DevTools 差不多，也是分为 frontend、backend、调试协议这几部分，只不过它多了一层适配器协议。

## Vue/React DevTools

Vue DevTools 或者 React DevTools 都是以 Chrome 插件（Chrome Extension）的形式存在的，要搞懂它们的原理就得了解 Chrome 插件的机制。

Chrome 插件机制分为三个部分

- Content Script 部分可以操作 DOM，可以监听 DOM Event。
- Background 部分可以访问 extension api，可以和 Content Script 还有 DevTools Page 通信。
- DevTools Page（vue的调试面板） 部分可以访问 devtools api，可以向当前 window 注入 JS 执行。

大概的运行流程：

- DevTools Page 是可以在页面 eval JS 的，那就可以注入 backend 的代码。
- backend 的代码可以拿到 Vue 组件的信息，通过 window message 的方式传递给 Background。
- Background 可以和 DevTools Page 通信，从而实现消息转发。
- DevTools Page 根据拿到的数据，渲染组件的信息，实现交互功能。
