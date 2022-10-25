import { dirname, resolve, join, parse } from 'path'
import { fileURLToPath } from 'url'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { Server, Router } from '../../../lib/index.js'
import { getList, addTask } from '../model/todolist.js'
import param from '../../../lib/aspect/param.js'
import { existsSync, statSync, createReadStream } from 'fs'
import mime from 'mime'
import zlib from 'zlib'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbFile = resolve(__dirname, '../database/todolist.db') // todolist.db是sqlite数据库文件

let db = null

const app = new Server()
const router = new Router()

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

/*
如果请求的路径是/list，则从todo表中获取所有任务数据
*/
app.use(router.get('/list', async ({database, route, res}, next) => {
  res.setHeader('Content-Type', 'application/json')
  const result = await getList(database) // 获取任务数据
  res.body = {data: result}
  await next()
}))

app.use(param)

app.use(router.post('/add', async ({database, params, res}, next) => {
  res.setHeader('Content-Type', 'application/json');
  const result = await addTask(database, params)
  res.body = result
  await next()
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