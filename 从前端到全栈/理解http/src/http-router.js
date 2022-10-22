import Server from './http-interceptor.js'
import Router from './router.js'


const app = new Server()
const router = new Router()

app.listen(9000)


app.use(router.all('/test/:course/:lecture', async ({route, res}, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.body = route
  await next()
}))

app.use(router.all('.*', async ({req, res}, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.body = '<h1>Hello world</h1>';
  await next()
}))
