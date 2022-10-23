import http from 'http'
import { fileURLToPath } from 'url'
import { dirname, resolve, join, parse } from 'path'
import { existsSync, statSync, createReadStream } from 'fs'
import mime from 'mime' // 获取文件扩展类型

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = http.createServer((req, res) => {
  // 拼接文件路径
  let filePath = resolve(__dirname, join('../../public', req.url))

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
      res.writeHead(status, 
        { 
          'Content-Type': mime.getType(ext),
          'Cache-Control': 'max-age=86400', // 强缓存一天
          'Last-Modified': stats.mtimeMs // 协商缓存响应头
        }
      )
      if(status === 200) {
        const fileStream = createReadStream(filePath)
        fileStream.pipe(res)
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