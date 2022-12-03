// void 代表空，没有返回值。在 js 中函数调用默认返回的就是 undefined

// 没有调用 return 语句
function foo(): void { }

// 调用了 return 语句，但没有返回值
function bar(): void {
  return;
}

function bar1(): undefined {
  return;
}

export {};