// unknown
// 一个 unknown 类型的变量可以再次赋值为任意其它类型，但只能赋值给 any 与 unknown 类型的变量
let unknownVar: unknown = '';

unknownVar = false;
unknownVar = '';
unknownVar = {
  site: '',
};

unknownVar = () => {};

const val1: string = unknownVar; // Error
const val2: number = unknownVar; // Error
const val3: () => {} = unknownVar; // Error
const val4: {} = unknownVar; // Error

const val5: any = unknownVar;
const val6: unknown = unknownVar;

unknownVar.foo(); // 报错：对象类型为 unknown
(unknownVar as { foo: () => {} }).foo();
