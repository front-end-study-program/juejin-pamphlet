# vscode-snippets

配置 vscode 代码片段

Ctrl + Shift + p 搜索 snippets 配置用户代码片段，新建一个项目级别的代码片段。会生成一个 xxx.code-snippets 的配置 json 文件。

## snippets 语法

- 指定光标位置：$x
- 多光标编辑：$x $x
- 指定 placeholder 文本：${x:placeholder}
- 指定多选值：${x|aaa,bbb|}
- 取变量：$VariableName
- 对变量做转换：${VariableName/正则/替换的文本/}
