// any
// any 类型的变量几乎无所不能，它可以在声明后再次接受任意类型的值，同时可以被赋值给任意其它类型的变量
// 尽量使用类型断言去避免使用 any。想要表达未知类型使用 unknown
let anyVar: any = '';

anyVar = false;
anyVar = '';
anyVar = {
  site: '',
};

anyVar = () => {};

const val1: string = anyVar;
const val2: number = anyVar;
const val3: () => {} = anyVar;
const val4: {} = anyVar;

anyVar.foo.bar.baz();
anyVar[0][1][2].prop1;
