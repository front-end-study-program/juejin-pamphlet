// 可选参数 ?
// 注意：可选参数必须位于必选参数之后
// 在函数逻辑中注入可选参数默认值
function foo1(name: string, age?: number): number {
  const inputAge = age || 18; // 或使用 age ?? 18
  return name.length + inputAge
}

// 直接为可选参数声明默认值
function foo2(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge
}


// rest参数 ...rest
function foo3(arg1: string, ...rest: any[]) { }


function foo4(arg1: string, ...rest: [number, boolean]) { }

foo4("''", 18, true)

export {};