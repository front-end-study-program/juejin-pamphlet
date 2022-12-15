// 判断类型兼容性的方式

// 1.条件类型来判断类型兼容性
// 返回 1，则说明 '' 为 string 的子类型。否则，说明不成立
type Result = '' extends string ? 1 : 2; // 1

// 2.通过赋值来进行兼容性检查
declare let source: string;
declare let anyType: any;
declare let neverType: never;
anyType = source;
// 不能将类型“string”分配给类型“never”。
neverType = source;
