import http from 'http'
import { fileURLToPath } from 'url'
import { resolve, join, dirname } from 'path'
import { createReadStream, existsSync } from 'fs'
import mime from 'mime'
import checksum from 'checksum'


const __dirname = dirname(fileURLToPath(import.meta.url))

const server = http.createServer((req, res) => {
  let filePath = resolve(__dirname, join('../public', req.url))

  if(!existsSync(filePath)) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end('<h1>404 Not Found</h1>');
  }

  checksum.file(filePath, (err, sum) => {
    const resStream = createReadStream(filePath)
    sum = `"${sum}"` // etag 要加双引号

    if(req.headers['if-none-match'] === sum) {
      res.writeHead(304, {
        'Content-Type': mime.getType(filePath),
        etag: sum
      })
      res.end()
    } else {
      res.writeHead(200, {
        'Content-Type': mime.getType(filePath),
        etag: sum
      })
      resStream.pipe(res)
    }

  })

})


server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
});

server.listen(8080, () => {
  console.log('opened server on', server.address())
});