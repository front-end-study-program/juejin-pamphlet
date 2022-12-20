// 集合工具类型
// 条件类型、条件类型分布式特性

// 交集
type MyExtract<T, U> = T extends U ? T : never;
type AExtractB = MyExtract<1 | 2 | 3, 1 | 2 | 4>; // 1 | 2
// 运算过程
type _AExtractB =
  | (1 extends 1 | 2 | 4 ? 1 : never) // 1
  | (2 extends 1 | 2 | 4 ? 2 : never) // 2
  | (3 extends 1 | 2 | 4 ? 3 : never); // never


// 差集 
type MyExclude<T, U> = T extends U ? never : T;
type SetA = 1 | 2 | 3 | 5;
type SetB = 0 | 1 | 2 | 4;
type AExcludeB = MyExclude<SetA, SetB>; // 3 | 5
// 运算过程
type _AExcludeB =
  | (1 extends 0 | 1 | 2 | 4 ? never : 1) // never
  | (2 extends 0 | 1 | 2 | 4 ? never : 2) // never
  | (3 extends 0 | 1 | 2 | 4 ? never : 3) // 3
  | (5 extends 0 | 1 | 2 | 4 ? never : 5); // 5



// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;

type NonNullable<T> = T extends null | undefined ? never : T;
type _NonNullable<T> = Difference<T, null | undefined>