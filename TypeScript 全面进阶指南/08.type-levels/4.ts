// 装箱类型
type Result14 = string extends String ? 1 : 2; // 1
type Result15 = String extends {} ? 1 : 2; // 1
type Result16 = {} extends object ? 1 : 2; // 1
type Result17 = object extends Object ? 1 : 2; // 1

// 实际上 string extends object 并不成立
type Result18 = string extends object ? 1 : 2; // 2


// 矛盾的结论
type Result19 = {} extends object ? 1 : 2; // 1
type Result20 = object extends {} ? 1 : 2; // 1

type Result21 = object extends Object ? 1 : 2; // 1
type Result22 = Object extends object ? 1 : 2; // 1

type Result23 = Object extends {} ? 1 : 2; // 1
type Result24 = {} extends Object ? 1 : 2; // 1

// 结论：原始类型 < 原始类型对应的装箱类型 < Object 类型。