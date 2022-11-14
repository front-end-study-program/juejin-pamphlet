import { dirname, resolve, join, parse } from 'path'
import { fileURLToPath } from 'url'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { Server, Router } from '../../../lib/index.js'
import { getList, addTask } from '../model/todolist.js'
import param from '../../../lib/aspect/param.js'
import cookie from '../../../lib/aspect/cookie.js'
import { existsSync, statSync, createReadStream } from 'fs'
import mime from 'mime'
import zlib from 'zlib'
import { login } from '../model/user.js'
import { getSession } from '../model/session.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbFile = resolve(__dirname, '../database/todolist.db') // todolist.db是sqlite数据库文件

let db = null

const app = new Server()
const router = new Router()

app.use(cookie)
app.use(param)


app.use(async ({cookies, res}, next) => {
  let id = cookies.interceptor_js;
  if(!id) {
    id = Math.random().toString(36).slice(2);
  }
  res.setHeader('Set-Cookie', `interceptor_js=${id}; Path=/; Max-Age=${7 * 86400}`); // 设置cookie的有效时长一周
  await next();
});

app.use(async ({ req }, next) => {
  console.log(`${req.method} ${req.url}`)
  await next()
})


app.use(async (ctx, next) => {
  if(!db) { // 如果数据库连接未创建，就创建一个
    db = await open({
      filename: dbFile,
      driver: sqlite3.cached.Database
    });
  }
  ctx.database = db // 将db挂在ctx上下文对象的database属性上

  await next()
});

app.use(router.post('/login', async (ctx, next) => {
  const {database, params, res} = ctx;
  res.setHeader('Content-Type', 'application/json');
  const result = await login(database, ctx, params);
  res.statusCode = 302;
  if(!result) { // 登录失败，跳转到login继续登录
    res.setHeader('Location', '/login.html');
  } else {
    res.setHeader('Location', '/'); // 成功，跳转到 index
  }
  await next();
}));

async function checkLogin(ctx) {
  const userInfo = await getSession(ctx.database, ctx, 'userInfo');
  ctx.userInfo = userInfo;
  return ctx.userInfo;
}

/*
如果请求的路径是/list，则从todo表中获取所有任务数据
*/
app.use(router.get('/list', async (ctx, next) => {
  const { res } = ctx
  const userInfo = await checkLogin(ctx); // 如果session存在并有效，则返回用户信息对象
  res.setHeader('Content-Type', 'application/json');

  if(userInfo) {
    const result = await getList(database, userInfo);
    res.body = {data: result};
  } else {
    res.body = {err: 'not login'};
  }
  await next();
}))

app.use(router.post('/add', async (ctx, next) => {
  const {database, params, res} = ctx;
  const userInfo = await checkLogin(ctx);
  res.setHeader('Content-Type', 'application/json');

  if(userInfo) {
    const result = await addTask(database, userInfo, params);
    res.body = result;
    await next();
  } else {
    res.body = {err: 'not login'};
  }
  await next();
}));


app.use(router.get('.*', async ({req, res}, next) => {
  let filePath = resolve(__dirname, join('../www', req.url))

  if(existsSync(filePath)) {
    const stats = statSync(filePath)
    if(stats.isDirectory()) {
      filePath = join(filePath, 'index.html')
    }

    if(existsSync(filePath)) {
      const { ext } = parse(filePath)
      const stats = statSync(filePath)
      const timeStamp = req.headers['if-modified-since']
      res.statusCode = 200
      if(timeStamp && Number(timeStamp) === stats.mtimeMs) {
        res.statusCode = 304
      }
      const mimeType = mime.getType(ext)
      res.setHeader('Content-Type', mimeType)
      res.setHeader('Cache-Control', 'max-age=86400')
      res.setHeader('Last-Modified', stats.mtimeMs)
      const acceptEncoding = req.headers['accept-encoding']
      const compress = acceptEncoding && /^(text|application)\//.test(mimeType)
      let compressionEncoding
      if(compress) {
        acceptEncoding.split(/\s*,\s*/).some((encoding) => {
          if(encoding === 'gzip') {
            res.setHeader('Content-Encoding', 'gzip')
            compressionEncoding = encoding
            return true
          }
          if(encoding === 'deflate') {
            res.setHeader('Content-Encoding', 'deflate')
            compressionEncoding = encoding
            return true;
          }
          if(encoding === 'br') {
            res.setHeader('Content-Encoding', 'br')
            compressionEncoding = encoding
            return true
          }
          return false
        })
      }
      if(res.statusCode === 200) {
        const fileStream = createReadStream(filePath);
        if(compress && compressionEncoding) {
          let comp
          if(compressionEncoding === 'gzip') {
            comp = zlib.createGzip()
          } else if(compressionEncoding === 'deflate') {
            comp = zlib.createDeflate()
          } else {
            comp = zlib.createBrotliCompress()
          }
          res.body = fileStream.pipe(comp)
        } else {
          res.body = fileStream
        }
      }
    }
  } else {
    res.setHeader('Content-Type', 'text/html')
    res.body = '<h1>Not Found</h1>'
    res.statusCode = 404
  }
  await next()
}))

/*
如果路径不是/list, 则返回'<h1>Not Found</h1>'文本
*/
app.use(router.all('.*', async ({params, req, res}, next) => {
  res.setHeader('Content-Type', 'text/html')
  res.body = '<h1>Not Found</h1>'
  res.statusCode = 404
  await next()
}))

app.listen({
  port: 9090,
  host: '0.0.0.0',
})