// 原始类型、对象类型的类型层级
// 一个基础类型和它们对应的字面量类型必定存在父子类型关系
type Result1 = '' extends string ? 1 : 2; // 1
type Result2 = 1 extends number ? 1 : 2; // 1
type Result3 = true extends boolean ? 1 : 2; // 1
type Result4 = { name: string } extends object ? 1 : 2; // 1
type Result5 = { name: '' } extends object ? 1 : 2; // 1
type Result6 = [] extends object ? 1 : 2; // 1

// 结论：字面量类型 < 对应的原始类型
