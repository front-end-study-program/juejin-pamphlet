// 类型断言守卫 asserts condition
// 断言守卫和类型守卫最大的不同点在于，在判断条件不通过时，断言守卫需要抛出一个错误，类型守卫只需要剔除掉预期的类型

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

// 与 is 结合使用
let name: any = '';

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Not a number!');
  }
}

assertIsNumber(name);

// number 类型！
name.toFixed();