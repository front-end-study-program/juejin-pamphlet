import net from 'net'

function responseData(str, status = 200, desc = 'OK') {
  return `HTTP/1.1 ${status} ${desc}
    Connection: keep-alive
    Date: ${new Date()}
    Content-Length: ${str.length}
    Content-Type: text/html

    ${str}`;
}

// 创建 server 对象
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    // 监听请求信息
    const matched = data.toString('utf-8').match(/^GET ([/\w]+) HTTP/)
    if(matched) {
      const path = matched[1]
      if(path === '/') { //如果路径是'/'，返回hello world、状态是200
        socket.write(responseData('<h1>Hello world</h1>'))
      } else { // 否则返回404状态
        socket.write(responseData('<h1>Not Found</h1>', 404, 'NOT FOUND'))
      }
    }
    console.log(`DATA:\n\n${data}`)
  })

  socket.on('close', () => {
    // 监听请求关闭
    console.log('connection closed, goodbye!\n\n\n')
  })
}).on('error', (err) => {
  throw err
})


// 监听ip地址和端口
server.listen({
  host: '0.0.0.0',
  port: 8080
}, () => {
  // 监听服务启动
  console.log('opened server on', server.address())
})