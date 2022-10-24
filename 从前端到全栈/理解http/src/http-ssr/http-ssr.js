import fs from 'fs'
import url from 'url'
import path from 'path'
import Server from '../http-interceptor/http-interceptor.js'
import Router from '../../lib/router.js'
import { getCoronavirusKeyIndex, getCoronavirusByDate } from '../../module/mock.js'
import handlebars from 'handlebars'
import param from '../../lib/aspect/param.js'

const app = new Server()
const router = new Router()


const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

app.use(router.get('/coronavirus/index', async ({ route, res }, next) => {
  const index = getCoronavirusKeyIndex()
   // 获取模板文件
   const tpl = fs.readFileSync(path.resolve(__dirname, './view/coronavirus_index.html'), {encoding: 'utf-8'})

   // 编译模板
  const template = handlebars.compile(tpl)

   // 将数据和模板结合
   const result = template({data: index})
   res.setHeader('Content-Type', 'text/html')
   res.body = result
   await next()
}))

app.use(param)

app.use(router.get('/coronavirus/:date', async ({params, route, res}, next) => {
  const data = getCoronavirusByDate(route.date)
  if(params.type === 'json') {
    res.setHeader('Content-Type', 'application/json')
    res.body = { data }
  } else {
    const tpl = fs.readFileSync(path.resolve(__dirname, './view/coronavirus_date.html'), {encoding: 'utf-8'})
  
    const template = handlebars.compile(tpl)
    const result = template({data})
  
    res.setHeader('Content-Type', 'text/html')
    res.body = result
  }
  await next()
}))


app.listen(9090)