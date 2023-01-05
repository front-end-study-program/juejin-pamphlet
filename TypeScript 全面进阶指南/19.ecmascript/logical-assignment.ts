// 逻辑赋值
// 将一个操作符和赋值符号结合在一起，如复合赋值一般

// 复合赋值
// 复合赋值其实就是先执行操作，再将操作结果赋值给左边的变量。如 a += b 就是执行 a + b，然后将结果赋值给 a。
let a = 1;
let b = 2;
a = a + b;
a += b;
a = a - b;
a -= b;
a = a * b;
a *= b;


// 逻辑赋值
a = a || b;
a ||= b;
a = a && b;
a &&= b;


let arr: string[];

(arr ??= []).push("foo");

// 等价于以下这段
arr = arr ?? [];
arr.push("foo");

export {}