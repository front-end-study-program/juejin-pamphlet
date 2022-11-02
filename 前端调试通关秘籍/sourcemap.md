# sourcemap

`sourcemap` 是关联编译后的代码和源码的，通过一个个行列号的映射

格式如下：

```js
{
　version : 3,
　file: "out.js", // 文件名
　sourceRoot : "", // 源码根目录
　sources: ["foo.js", "bar.js"], // 源码文件
　names: ["a", "b"], // 转换前的变量名
　mappings: "AAgBC,SAAQ,CAAEA;AAAEA", // 位置映射
  sourcesContent: ['const a = 1; console.log(a)', 'const b = 2; console.log(b)'] // 对应的源码内容
}
```

## mappings

比如编译后代码的第 3 行第 4 列，对应着源码里的第 8 行第 5 列这种，这叫做一个 `mapping`。

mappings 部分是通过分号 `;` 和逗号 `,` 分隔的。一个分号就代表一行，这样就免去了行的映射，每一行可能有多个位置的映射，用 `,` 分隔

```js
mappings:"AAAAA,BBBBB;CCCCC"
```

以下几项经过编码之后，就成了 AAAAA ，这种编码方式叫做 VLQ 编码。一共五位，分别有不同的含义：

- 转换后代码的第几列（行数通过分号 `;` 来确定）
- 转换前的哪个源码文件，保存在 sources 里的，这里通过下标索引
- 转换前的源码的第几行
- 转换前的源码的第几列
- 转换前的源码的哪个变量名，保存在 names 里的，这里通过下标索引

各种调试工具一般都支持 sourcemap 的解析，只要在文件末尾加上这样一行：

```js
//@ sourceMappingURL=/path/to/source.js.map
```
