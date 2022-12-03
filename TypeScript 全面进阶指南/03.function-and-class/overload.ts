// 函数重载
// 这种业务场景会根据入参的值进行判断返回不同的类型，以下这种联合类型无法体现
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

/**
 * 使用函数重载签名，就能体现入参不同返回不同类型
 * 注意：
 * 拥有多个重载声明的函数在被调用时，是按照重载的声明顺序往下查找的
 * 因此在第一个重载声明中，为了与逻辑中保持一致，即在 bar 为 true 时返回 string 类型，
 * 这里我们需要将第一个重载声明的 bar 声明为必选的字面量类型
 */
function func1(foo: number, bar: true): string;
function func1(foo: number, bar?: false): number;
function func1(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func1(599); // number
const res2 = func1(599, true); // string
const res3 = func1(599, false); // number


export {}