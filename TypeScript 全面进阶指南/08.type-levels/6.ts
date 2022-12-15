// bottom type
// never 一个根本不存在的类型。对于这样的类型，它会是任何类型的子类型
type Result33 = never extends '' ? 1 : 2; // 1

type Result34 = undefined extends '' ? 1 : 2; // 2
type Result35 = null extends '' ? 1 : 2; // 2
type Result36 = void extends '' ? 1 : 2; // 2

// 结论：never < 字面量类型