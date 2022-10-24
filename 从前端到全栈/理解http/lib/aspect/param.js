import url from 'url'
import queryString from 'query-string'
export default async function(ctx, next) {
  const { req } = ctx
  const { query } = url.parse(`http://${req.headers.host}${req.url}`)
  ctx.params = queryString.parse(query)

  if(req.method === 'POST') {
    const headers = req.headers
    // 读取POST的body数据
    const body = await new Promise((resolve) => {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk.toString() // convert Buffer to string
      });
      req.on('end', () => {
        resolve(data)
      });
    });
    ctx.params = ctx.params || {}
    if(headers['content-type'] === 'application/x-www-form-urlencoded') {
      Object.assign(ctx.params, queryString.parse(body))
    } else if(headers['content-type'] === 'application/json') {
      Object.assign(ctx.params, JSON.parse(body))
    }
  }
  
  await next()
}