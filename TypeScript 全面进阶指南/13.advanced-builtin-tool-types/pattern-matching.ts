// 模式匹配工具类型进阶
type MyAwaited<T> = T extends null | undefined
  ? T 
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any 
    ? MyAwaited<V>
    : never
  : T;