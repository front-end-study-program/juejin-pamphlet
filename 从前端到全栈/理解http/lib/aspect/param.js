import url from 'url'

export default async function(ctx, next) {
  const { req } = ctx
  const { query } = url.parse(`http://${req.headers.host}${req.url}`)
  ctx.params = new url.URLSearchParams(query)
  await next()
}