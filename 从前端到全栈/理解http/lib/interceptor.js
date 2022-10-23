export default class Interceptor {
  constructor() {
    this.aspects = [] // 存储拦截切面 
  }
  // 注册拦截切面
  use(functor) {
    this.aspects.push(functor)
    return this
  }
  // 执行注册的拦截切面
  async run(context) {
    const aspects = this.aspects

    // 将注册的拦截切面包装成一个洋葱模型
    const proc = aspects.reduceRight(function(a, b) {
      return async () => {
        await b(context, a)
      }
    }, () => Promise.resolve())

    try {
      await proc() // 从外到里执行这个洋葱模型
    } catch(ex) {
      console.error(ex.message)
    }

    return context
  }
}

// function wait(ms) {
//   return new Promise(res => {
//     setTimeout(res, ms)
//   })
// }


// const inter = new Interceptor()

// const task = function(id) {
//   return async (ctx, next) => {
//     try {
//       console.log(`task ${id} begin`)
//       ctx.count++
//       await wait(1000)
//       console.log(`count: ${ctx.count}`)
//       await next()
//       console.log(`task ${id} end`)
//     } catch (ex) {
//       throw new Error(ex)
//     }
//   }
// }

// // 将多个任务以拦截切面的方式注册到拦截器中
// inter.use(task(0))
// inter.use(task(1))
// inter.use(task(2))
// inter.use(task(3));
// inter.use(task(4))

// // 从外到里依次执行拦截切面
// inter.run({count: 0})