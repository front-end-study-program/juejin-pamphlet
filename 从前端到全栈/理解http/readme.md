# 理解 Http

## 网络 OSI 模型与网络协议

网络开放式互联网（OSI）模型分为**物理层、数据链路层、网络层、传输层、会话层、表示层和应用层**这七层结构。

万维网（World Wide Web）模型将物理层和数据链路层合并为物理层，把会话层、表示层和应用层合并为应用层，所以是四层结构。

![模型示例](https://p.ssl.qhimg.com/t01e5f575e21a82f87d.webp)

编写 Web 应用时，通常很少和物理层打交道，基本上是和网络层、传输层和应用层打交道。网络层主要是 IP 协议，也就是 IP 地址的解析；传输层主要是 TCP 协议；应用层主要是 HTTP 协议。

HTTP 协议是基于传输层 TCP 协议建立在 TCP 协议之上的文本协议，因此 TCP 服务可以处理 HTTP 请求和响应。

## Http 内容协商

内容协商是 HTTP 协议的基本原则，服务器根据不同的请求头，对指向同一 URL 的请求提供不同格式的响应内容。

- 根据 Accept 请求头，返回不同的内容

  ```js
  const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname === "/") {
      const accept = req.headers.accept;
      if (accept.indexOf("application/json") >= 0) {
        // 返回 json 格式内容
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } else {
        // ...返回其他内容
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>Not Found</h1>");
    }
  });
  ```

- 根据 HTTP 请求动作(method)实现内容协商

  ```js
  const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname === "/") {
      const accept = req.headers.accept;
      if (req.method === "POST") {
        // 返回 json 格式内容
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } else {
        // ...返回其他内容
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>Not Found</h1>");
    }
  });
  ```

## HTTP 请求动作和状态码

1. 请求动作

   根据标准的 HTTP/1.1 协议，HTTP 请求的动作分为 GET、HEAD、OPTIONS、POST、PUT、PATCH、DELETE。

   - GET 表示从服务器获取 URL 指定的资源。
   - HEAD 表示只获取该 URL 指定资源的 HTTP 请求头部分（忽略 Body）。
   - OPTIONS 是一个特殊的请求，用来预检服务器是否支持某个请求动作。比如客户端可以先发起一个请求询问服务器是否支持 PUT 请求。若支持，则发起后续的 PUT 请求。
   - POST 表示将数据资源从客户端提交给服务器。
   - PUT 表示更新服务器上某个已有资源。
   - PATCH 也表示更新服务器上某个已有资源，但以增量更新的方式，客户端只传输修改部分。
   - DELETE 表示从服务器上删除某个资源。

2. 状态码

   HTTP 的状态码表示 HTTP 请求的结果，它是一个三位数字，首位可能是 1、2、3、4、5。

   - 首位是 1 表示中间状态，按照规范 POST 请求会先提交 HEAD 信息，如果服务器返回 100，才将数据信息提交。
   - 首位是 2 表示请求结束，最常用的就是 200，表示正常返回。
   - 首位是 3 表示被请求的资源被重定向，最常用的是 301、302、304。301 表示资源已经被永久移动到新的位置，302 表示资源被暂时移动到新的位置，304 表示资源被缓存，这是浏览器的缓存策略。
   - 首位是 4 表示请求错误，最常用的是 400、403、404。400 是服务器无法理解和处理该请求；403 表示服务器理解请求，但客户端不具有获取该请求的权限，因此服务器拒绝响应；404 表示请求的资源不存在。
   - 首位是 5 表示服务器自身存在问题，导致不能响应请求，常见的有 500、502、504。一般 500 表示服务器当前状态异常；502 表示作为网关的服务器无法从上游获取到有效数据；504 表示请求的数据超时。

## 理解 MIME 类型

HTTP 服务可不止处理 HTML 文件，还可以处理各种文件，如图片、CSS、JS、视频、音频等等。

MIME 标准以 type/subtype，即主类型/子类型，来表示一个文件的格式。MIME 类型对大小写不敏感，通常都写成小写形式。

HTTP 请求常见的主类型如下：

| 类型        | 描述                                                                    | 典型示例                                                                                                                            |
| ----------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| text        | 表明文件是普通文本，理论上是人类可读                                    | text/plain, text/html, text/css, text/javascript                                                                                    |
| image       | 表明是某种图像。不包括视频，但是动态图（比如动态 gif）也使用 image 类型 | image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon                                                               |
| audio       | 表明是某种音频文件                                                      | audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav                                                                            |
| video       | 表明是某种视频文件                                                      | video/webm, video/ogg                                                                                                               |
| application | 表明是某种二进制数据                                                    | application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml, application/pdf |

## stream 模块

`stream` 的应用场景主要就是处理IO操作，而http请求和文件操作都属于IO操作

```js
import http from 'http'
import { fileURLToPath } from 'url'
import { dirname, resolve, join } from 'path'
import { createReadStream } from 'fs'
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = http.createServer((req, res) => {
  // 拼接文件路径
  let filePath = resolve(__dirname, join('../public', req.url))
 
  const fileStream = createReadStream(filePath) // 以流的形式读取文件内容
  fileStream.pipe(res) // pipe 将两个流连接，这样数据就会从上游流向下流
})
```

## Http 缓存

在 HTTP 协议中，动作 GET 和 OPTIONS 是支持缓存的。浏览器支持两种标准的缓存策略：强缓存和协商缓存

### 强缓存

浏览器的缓存规范允许服务器返回资源的时候带有Cache-Control响应头。这个策略叫做强缓存。

Cache-Control响应头的最常用格式为：

```ini
Cache-Control: max-age=<seconds>
```

当浏览器请求资源得到的响应带有Cache-Control响应头时，浏览器会将该资源缓存到本地。当浏览器下一次访问该资源时，同时满足以下 3 个条件，浏览器会直接使用本地的资源，不发起 HTTP 请求：
  
- 两次请求的 url 完全相同（包括了 host、pathname、query）
- 请求的动作是 GET
- 请求头不带有Cache-Control: no-cache和Pragma: no-cache这两个信息

根据浏览器的标准，通过地址栏访问、以及强制刷新网页的时候，HTTP 请求头自动会带上Cache-Control: no-cache和Pragma: no-cache的信息。只要有这两个请求头之一，浏览器就会忽略响应头中的Cache-Control字段。

### 协商缓存

以 HTTP 内容协商的方式来实现的缓存，称为协商缓存。

协商缓存规定，浏览器再发起 HTTP 请求的时候，服务器可以返回Last-Modified响应头，这个响应头的值是一个时间戳。如果服务器这么做了，那么浏览器会缓存这个资源，并且在今后请求该资源的时候，会带有if-modified-since请求头，它的值是上一次Last-Modified响应头中的时间戳。

服务器收到带有if-modified-since请求头的请求，根据请求头中的时间戳，对文件进行判断，如果文件内容在该时间戳之后到当前时间里没有被修改，那么服务器返回一个 304 响应，该响应表示只有 HEAD 没有 BODY。浏览器如果收到 304 响应，就会以缓存的内容作为 BODY。

协商缓存不止Last-Modified一种，还有一种协商缓存是Etag，它的机制和Last-Modified大同小异，只是把Last-Modified的时间戳换成Etag签名，相应地把If-Modified-Since字段换成If-None-Match字段。Etag的值可以用资源文件的 MD5 或 sha 签名。

协商缓存为什么要有两种呢？

- 有时候我们的网站是分布式部署在多台服务器上，一个资源文件可能在每台服务器上都有副本，相应地资源文件被修改时候，新的文件要同步到各个服务器上，导致各个文件副本的修改时间不一定相同。那么当用户一次访问请求的服务器和另一次访问请求的服务器不同时，就有可能因为两个文件副本的修改时间不同而使得Last-Modified形式的协商缓存失效。

- 如果这种情况采用Etag形式的协商缓存，根据文件内容而不是修改时间来判断缓存，就不会有这个问题了。使用Etag实现协商缓存的思路，与使用Last-Modified类似，只是用文件内容的 checksum 校验代替文件信息中的stats.mtimeMs来判断文件内容是否被修改。
