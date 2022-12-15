
// 联合类型
// 联合类型中，只需要符合其中一个类型，就可以认为实现了这个联合类型

type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
type Result8 = 'lin' extends 'lin' | 'bu' | 'du' ? 1 : 2; // 1
type Result9 = true extends true | false ? 1 : 2; // 1
type Result10 = string extends string | false | number ? 1 : 2; // 1

// 字面量类型 < 包含此字面量类型的联合类型，原始类型 < 包含此原始类型的联合类型


// 同一基础类型的字面量联合类型 < 此基础类型
type Result11 = 'lin' | 'bu' | 'budu' extends string ? 1 : 2; // 1
type Result12 = {} | (() => void) | [] extends object ? 1 : 2; // 1


// 结论：字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型
type Result13 = 'foo' extends 'foo' | '599'
  ? 'foo' | '599' extends string
    ? 2
    : 1
  : 0;