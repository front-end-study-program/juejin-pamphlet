import http from 'http'
import { fileURLToPath } from 'url'
import { dirname, resolve, join, parse } from 'path'
import { existsSync, statSync, createReadStream } from 'fs'
import mime from 'mime' // 获取文件扩展类型
import zlib from 'zlib' // 压缩资源

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = http.createServer((req, res) => {
  // 拼接文件路径
  let filePath = resolve(__dirname, join('../public', req.url))

  if(existsSync(filePath)) {
    const stats = statSync(filePath) // 返回文件状态信息
    const isDir = stats.isDirectory() // 判断是否为目录
    if(isDir) {
      filePath = join(filePath, 'index.html')
    }

    if(!isDir || existsSync(filePath)) {
      const { ext } = parse(filePath) // 获取文件扩展名
      const timeStamp = req.headers['if-modified-since']
      let status = 200
      if(timeStamp && Number(timeStamp) === stats.mtimeMs) {
        // 如果timeStamp和stats.mtimeMS相等，说明文件内容没有修改
        status = 304
      }
      const mimeType = mime.getType(ext)
      const responseHeaders = {
        'Content-Type': mimeType,
        'Cache-Control': 'max-age=86400',
        'Last-Modified': stats.mtimeMs,
      }
      const acceptEncoding = req.headers['accept-encoding'] // 获取客户端支持的压缩算法
      const compress = /^(text|application)\//.test(mimeType);
      if(compress) {
        // 返回客户端支持的一种压缩方式
        acceptEncoding.split(/\s*,\s*/).some((encoding) => {
          if(encoding === 'gzip') {
            responseHeaders['Content-Encoding'] = 'gzip'
            return true
          }
          if(encoding === 'deflate') {
            responseHeaders['Content-Encoding'] = 'deflate'
            return true
          }
          if(encoding === 'br') {
            responseHeaders['Content-Encoding'] = 'br'
            return true
          }
          return false
        })
      }
      const compressionEncoding = responseHeaders['Content-Encoding']
      res.writeHead(status, 
        responseHeaders
      )
      if(status === 200) {
        const fileStream = createReadStream(filePath)
        if(compress && compressionEncoding) {
          let comp
          
          // 使用指定的压缩方式压缩文件
          if(compressionEncoding === 'gzip') {
            comp = zlib.createGzip()
          } else if(compressionEncoding === 'deflate') {
            comp = zlib.createDeflate()
          } else {
            comp = zlib.createBrotliCompress()
          }
          fileStream.pipe(comp).pipe(res)
        } else {
          fileStream.pipe(res)
        }
      } else { 
        res.end() // 如果状态码不是200，不用返回Body
      } 
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>Not Found</h1>')
  }

}) 

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
  console.log('opened server on', server.address())
})