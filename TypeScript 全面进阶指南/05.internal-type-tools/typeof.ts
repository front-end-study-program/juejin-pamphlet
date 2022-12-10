// 类型查询 typeof
// typeof 返回的类型就是当把鼠标悬浮在变量名上时出现的推导后的类型，并且是最窄的推导程度（即到字面量类型的级别）

const str = "";

const obj = { name: "" };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
}

type Str = typeof str; // ""
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean


const func1 = (input: string) => {
  return input.length > 10;
}

const func2: typeof func1 = (name: string) => {
  return name === ''
}


const func3 = (input: string) => {
  return input.length > 10;
}

// boolean
type FuncReturnType = ReturnType<typeof func3>;

// 类型查询操作符后是不允许使用表达式的
const isInputValid = (input: string) => {
  return input.length > 10;
}

// 不允许表达式
let isValid: typeof isInputValid("");