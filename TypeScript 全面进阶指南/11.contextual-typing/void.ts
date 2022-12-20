// void 返回值类型下的特殊情况
// 当内置函数类型的返回值类型为 void 时
// 上下文类型对于 void 返回值类型的函数，并不会真的要求它啥都不能返回

type CustomHandler = (name: string, age: number) => void;

const handler1: CustomHandler = (name, age) => true;
const handler2: CustomHandler = (name, age) => 'foo';
const handler3: CustomHandler = (name, age) => null;
const handler4: CustomHandler = (name, age) => undefined;

const result1 = handler1('', 599); // void
const result2 = handler2('', 599); // void
const result3 = handler3('', 599); // void
const result4 = handler4('', 599); // void