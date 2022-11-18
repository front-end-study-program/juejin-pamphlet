import Server from '../../lib/server.js'
import Router from '../../lib/router.js'


const app = new Server({instances: 0})

const router = new Router()

let count = 0;
process.on('message', (msg) => { // 处理由worker.send发来的消息
  if (msg === 'count') { // 如果是count事件，则将count加一
    console.log('visit count: %d', ++count);
  }
});


app.use(async (ctx, next) => {
  console.log(`visit ${ctx.req.url} through worker: ${app.worker.process.pid}`)
  await next()
});

app.use(router.all('.*', async ({req, res}, next) => {
  res.setHeader('Content-Type', 'text/html')
  res.body = '<h1>Hello world</h1>'
  await next()
}));

app.listen({
  port: 9090,
  host: '0.0.0.0',
});