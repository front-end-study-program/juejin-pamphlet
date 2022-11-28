# Event Loop

打开 [react-fiber](https://claudiopro.github.io/react-fiber-vs-stack-demo/fiber.html) 的测试网站，打开调试工具 Performance 记录 reload 3s 的数据。

Main 的部分就是 Event Loop 的执行部分

展示的信息中有很多的颜色，有不同的含义：

- 灰色代表宏任务 task
- 蓝色是 html 的 parse
- 橙色是浏览器内部的 JS
- 紫色是样式的 reflow、repaint
- 绿色的是渲染
- 其余的颜色是用户 JS 的执行

在 Performance 中宽度代表时间，超过 50ms 就被认为是 Long Task，会被标红
