// 可选链
// 在 JavaScript 中，如果访问一个嵌套多层的属性，为了避免出现 Cannot read property of undefined 这样的错误，
// 我们通常会使用逻辑与 && 语法来确保在某一层出现空值时及时短路掉访问


const obj = {} as { data: { innerProperty: string }, func: () => void };

// 会返回上一次为真的值
const inner = obj && obj.data && obj.data.innerProperty;

// 优雅的可选链写法
// 它会在短路时返回一个 undefined
const inner1 = obj?.data?.innerProperty;

const expr = 'foo'
let a = 1
obj?.[expr];
obj?.[++a];
// 对应到 obj.func && obj.func()
obj?.func();