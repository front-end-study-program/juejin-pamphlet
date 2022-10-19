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
