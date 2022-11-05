# Cookie

Cookie 就是在无状态的 HTTP 协议之上建立一套状态保存的机制。

Cookie 机制流程：

- 在服务器响应浏览器的请求时可以设置一个Set-Cookie响应头，其中的内容是发送给浏览器的 Cookie；
- 浏览器会先保存 Cookie；
- 下一次发起请求时，浏览器会带上保存的Cookie，这样服务器就知道这个请求是谁发来的了。

Cookie 的规则包括以下几个方面：

- Max-Age：表示 Cookie 有效时长；
- Path：表示 Cookie 只在指定的 URL 请求中有效；
- Domain：表示 Cookie 在设置的 Domain 和它的子域名下都有效；
- Secure：表示 Cookie 只有使用 HTTPS/SSL 请求时有效；
- SameSite：可以用来限制第三方发来的 Cookie。

```js
res.setHeader('Set-Cookie', `interceptor_js=1; Domain=junyux.com; Path=/; Max-Age=86400; Secure; HttpOnly; SameSite=Strict`);
```

## Path

Path 规则指定一个 URL 路径，这个路径必须出现在请求 URL 路径中才有效。默认路径为 `/`

假如我们的请求 URL 的路径是：`/foo/bar`

```js
res.setHeader('Set-Cookie', `interceptor_js=1; Path=/`); // 有效
res.setHeader('Set-Cookie', `interceptor_js=1; Path=/foo`); // 有效
res.setHeader('Set-Cookie', `interceptor_js=1; Path=/bar`); // 有效
res.setHeader('Set-Cookie', `interceptor_js=1; Path=/abc`); // 无效
```

浏览器在请求的时候，只有 URL 路径包含 Path 路径时才会发送 Cookie。

Path 设置为/foo，当请求的 URL 是/foo、/foo/bar、/foo/bar/abc时，都会发送 Cookie。

而当请求的 URL 是/、/foobar、/bar/foo、/foo/abc时，则不会发送 Cookie。

## HttpOnly

如果 HttpOnly 规则被设定的话，那在页面上，JavaScript 无法通过 document.cookie 获取到该 Cookie，这增加了应用的安全性。

## Domain

默认情况下，Cookie 的 Domain 是当前 URL 的 hostname。

假如网站的域名是study.junyux.com，那么只有在study.junyux.com的域名下才能访问到 Cookie。

如果我们设置了 Domain，那么 Cookie 在设置的 Domain 和它的子域名下都有效。

```js
// junyux.com、www.junyux.com、study.junyux.com下都有效
res.setHeader('Set-Cookie', `interceptor_js=1; Domain=junyux.com`);
```

在Set-Cookie的时候，Domain 的值是当前域名和它的上级域名才有效，否则浏览器会忽略该响应头，不会设置 Cookie。

## Secure

Secure 规则只有在服务器使用 SSL 和 HTTPS 协议时才可以设置，如果设置了这个规则，这个 Cookie 就只有在使用 HTTPS/SSL 时才会被发送到服务器。

## SameSite

SameSite 规则用来限制第三方 Cookie。如果服务器的响应头中带有 SameSite 设置的 Cookie，那每当浏览器请求这个 URL 的时候，会根据 SameSite 的值决定是否返回 Cookie 给服务器。它有三个值，分别是Strict、Lax和None。

### Strict

Strict 表示严格，这个设置完全禁止了第三方网站向我们的服务器发送我们网站的 Cookie。

这个设置虽然完全制止了跨站攻击（CSRF）的攻击，但是也带来了非常不好的用户体验。比如，一个合法的第三方网站包含有君喻连接，（假设君喻网站的 Cookie 带有SameSite=strict的设置），那么用户从第三方网页点击跳转就不会带上君喻的 Cookie，跳转过去后总是显示未登录状态，需要用户重新登录。

### Lax

Lax 比 Strict 的规则宽松一点，它只允许第三方网站通过 GET 请求跳转到我们的服务器，并带上我们网站的 Cookie。

### None

None 就表示没有限制。

在老版本的浏览器中，如果不设置 Cookie 的 SameSite 规则，则默认的 SameSite 规则是None，但是 Chrome 浏览器升级了安全策略，现在如果不设置 SameSite 规则，默认的值为Lax。
