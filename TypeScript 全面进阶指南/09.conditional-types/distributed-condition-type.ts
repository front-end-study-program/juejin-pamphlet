// 分布式条件类型的特性
// 分布式条件类型（Distributive Conditional Type），也称条件类型的分布式特性
// 包裹泛型参数来禁用掉分布式特性

type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;

// 通过泛型参数传入差异
type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
type Res3 = Naked<number | boolean>;

// "N"
type Res4 = Wrapped<number | boolean>;

// 对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上

// 对泛型参数进行包装，来解决泛型参数裸类型带来的问题
export type NoDistribute<T> = T & {};

type Wrapped1<T> = NoDistribute<T> extends boolean ? "Y" : "N";
type Res5 = Wrapped1<number | boolean>; // "N"
type Res6 = Wrapped1<true | false>; // "Y"
type Res7 = Wrapped1<true | false | 599>; // "N"


// 联合类型的分布式条件判断
type CompareUnion<T, U> = [T] extends [U] ? true : false;
type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false


// 判断一个类型是否为 never
type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"foo">; // false

// IsAny 
type IsAny<T> = 0 extends 1 & T ? true : false;

// IsUnknown
type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;


// any 在直接作为判断参数时、作为泛型参数时
// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2;  // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1


// never 仅在作为泛型参数时
// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2; // 1

type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never>; // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never


// 联合类型的分布式条件分支，来达成交集
type Intersection<A, B> = A extends B ? A : never;
type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3