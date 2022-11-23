# vscode debugger 配置

- restart: attatch 的时候可以指定尝试重连的次数和时间间隔
- processId：除了可以通过网络端口，还可以通过进程 id 的方式 attach 到某个进程的调试服务
- program：调试的 node 代码路径，可以通过 args 传参
- runtimeExecutable：指定跑代码用的 runtime，默认是 node，也可以换成 ts-node、npm、pnpm 等，但要求这些命令在 PATH 环境变量里
- skipFiles：折叠某些路径，不显示在调用栈里，比如 node 内部的一些代码
- stopOnEntry：在首行断住，和 --inspect-brk 一样的效果
- autoAttachChildProcesses：自动 attch 到子进程的调试服务
- console：指定日志输出的位置，是内置的 console、terminal，还是外部的 terminal
- cwd：跑 runtime 的目录
- env：指定环境变量
- envFile：使用 env 文件来指定环境变量
- presentation：对多个调试配置做分组和排序

## attach

### restart

连接 ws 调试服务的重连次数和间隔时间

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach",
      "port": 9229,
      "request": "attach",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node",
      "restart": {
        "delay": 1000,
        "maxAttempts": 3
      }
    }
  ]
}
```

## launch

launch 不需要我们自己以调试模式启动，只需要指定 node 程序的地址

### program & args

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Program",
      "program": "${workspaceFolder}/test.js",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node",
      "args": [
        "---aaa1",
        "---aaa2"
      ]
    },
  ]
}
```

### runtimeExecutable

修改 debugger 的执行运行时，VSCode Debugger 会从 PATH 的环境变量中查找对应名字的 runtime 启动。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "runtime Executable",
      "program": "${workspaceFolder}/runtimeExecutable.ts",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node",
      "runtimeExecutable": "ts-node",
    },
    {
      "name": "launch via pnpm",
      "program": "${workspaceFolder}/test.js",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "runtimeArgs": [
        "test"
      ],
      "type": "node",
      "runtimeExecutable": "pnpm",
    }
  ]
}
```

### skipFiles

跳过文件执行的调用堆栈信息

以下会跳过 node 内部文件的堆栈信息和 test.js 文件的堆栈信息

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "skipFiles",
      "program": "${workspaceFolder}/test.js",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**",
        "${workspaceFolder}/test.js"
      ],
      "type": "node",
    },
  ]
}
```

### stopOnEntry

在首行进行断点

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "skipFiles",
      "program": "${workspaceFolder}/test.js",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**",
      ],
      "type": "node",
      "stopOnEntry": true
    },
  ]
}
```

### console

默认 debug 模式下，打印的日志是在 console 的，而不是 terminal。在 console 里是不支持彩色的

internalConsole 就是内置的 debug console 面板

internalTerminal 是内置的 terminal 面板

externalTerminal 会打开系统的 terminal 来展示日志信息

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "console",
      "program": "${workspaceFolder}/test.js",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**",
      ],
      "type": "node",
      "console": "integratedTerminal"
    },
  ]
}
```

### autoAttachChildProcesses

自动连接上子进程的 ws 调试服务的端口，默认为 true。设置为false 就不能断点子进程了

node 里是支持多进程的，可以把一些脚本放在子进程来跑来提高性能，充分利用计算机的资源

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "autoAttachChildProcesses",
      "program": "${workspaceFolder}/test.js",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**",
      ],
      "type": "node",
      "console": "integratedTerminal",
      "autoAttachChildProcesses": false
    },
  ]
}
```

### cwd

current work directory，当前工作目录

指定 runtime 在哪个目录运行，默认是项目根目录 workspaceFolder

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "cwd test",
      "type": "node",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "runtimeExecutable": "pnpm",
      "runtimeArgs": [
        "start"
      ],
      "cwd": "${workspaceFolder}/cwd-test"
    },
  ]
}
```

### env

配置 node 运行时的环境变量

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "env test",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/test.js",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "env": {
        "NODE_ENV": "development",
        "aaa": "123"
      }
    },
  ]
}
```

### envFile

使用 env 文件来设置 node 环境变量

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "env file",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/test.js",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "envFile": "${workspaceFolder}/.env"
    },
  ]
}
```

### presentation

对多个调试配置做分组和排序

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}",
      "presentation": {
        "hidden": false,
        "group": "chorme",
        "order": 1
      }
    },
    {
      "name": "env file",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/test.js",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "envFile": "${workspaceFolder}/.env",
      "presentation": {
        "hidden": false,
        "group": "node",
        "order": 1
      }
    },
  ]
}
```
