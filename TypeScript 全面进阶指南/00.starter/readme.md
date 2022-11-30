# VS Code 配置与插件

## 插件

1. TypeScript Importer：收集项目内所有的类型定义，在敲出:时提供这些类型来进行补全。自动把这个类型导入进来。

2. Move TS：可以通过编辑文件的路径，直接修改项目的目录结构。自动把文件目录更改到对应的样子，并且更新其他文件中对这一文件的导入语句。

3. ErrorLens：能够把 VS Code 底部问题栏的错误下直接显示到代码文件中的对应位置

## 配置

VS Code 有很强大的内置 TypeScript 支持，通过 Ctrl(Command) + Shift + P 打开命令面板，找到 Open Workspace Settings。然后输入 typescript 就会展示出官方的 ts 设置。搜索 typescript Inlay Hints 可以配置一些提示相关的配置：

- Function Like Return Types，显示推导得到的函数返回值类型；
- Parameter Names，显示函数入参的名称；
- Parameter Types，显示函数入参的类型；
- Variable Types，显示变量的类型。

## 快速执行 TS 文件

[ts-node](https://github.com/TypeStrong/ts-node) 和 [ts-node-dev](https://github.com/wclr/ts-node-dev) 可以直接执行 ts 文件，`ts-node-dev` 支持监听文件重新执行。

```bash
npm i ts-node typescript -g // 安装全局更容易操作
```

初始化 ts 配置文件 tsconfig.json

```bash
tsc --init
```

ts-node 执行 ts 文件

```bash
ts-node index.ts
```

### ts-node 配置

ts-node 可以通过两种方式进行配置，在 tsconfig 中新增 'ts-node' 字段，或在执行 ts-node 时作为命令行的参数。

- -P,--project：指定你的 tsconfig 文件位置。默认情况下 ts-node 会查找项目下的 tsconfig.json 文件，如果你的配置文件是 tsconfig.script.json、tsconfig.base.json 这种，就需要使用这一参数来进行配置了。
- -T, --transpileOnly：禁用掉执行过程中的类型检查过程，这能让你的文件执行速度更快，且不会被类型报错卡住。这一选项的实质是使用了 TypeScript Compiler API 中的 transpileModule 方法，我们会在后面的章节详细讲解。
- --swc：在 transpileOnly 的基础上，还会使用 swc 来进行文件的编译，进一步提升执行速度。
- --emit：如果你不仅是想要执行，还想顺便查看下产物，可以使用这一选项来把编译产物输出到 .ts-node 文件夹下（需要同时与 --compilerHost 选项一同使用）。

## ts-node-dev

[ts-node-dev](https://github.com/wclr/ts-node-dev)  基于 `node-dev`（类似 nodemon 的库，提供监听文件重新执行的能力） 与 `ts-node` 实现，并在重启文件进程时共享同一个 TS 编译进程，避免了每次重启时需要重新实例化编译进程等操作。

`ts-node-dev` 在全局提供了 `tsnd` 这一简写，你可以运行 `tsnd` 来检查安装情况。最常见的使用命令是这样的：

```bash
ts-node-dev --respawn --transpile-only index.ts
```

respawn 选项启用了监听重启的能力，而 transpileOnly 提供了更快的编译速度。
