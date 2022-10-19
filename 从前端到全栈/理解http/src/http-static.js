import http from 'http'
import { fileURLToPath } from 'url'
import { dirname, resolve, join, parse } from 'path'
import { existsSync, statSync, readFileSync } from 'fs'
import mime from 'mime' // 获取文件扩展类型

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
      const content = readFileSync(filePath) // 读取文件
      const { ext } = parse(filePath) // 获取文件扩展名
      res.writeHead(200, { 'Content-Type': mime.getType(ext) })
      return res.end(content)
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.end('<h1>Not Found</h1>')
}) 

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
  console.log('opened server on', server.address())
})