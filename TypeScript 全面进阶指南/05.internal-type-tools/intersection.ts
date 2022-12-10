// 交叉类型 &
// 需要符合这里的所有类型，才可以说实现了这个交叉类型，即 A & B，需要同时满足 A 与 B 两个类型才行

interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "",
  age: 18
}


// 原始类型交叉类型
// 不存在一种类型即是 string 又是 number，所以是 never 类型
type StrAndNum = string & number; // never


// 对象类型的交叉类型
// 其内部的同名属性类型同样会按照交叉类型进行合并
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  }
}

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  }
}

type Composed = Struct1 & Struct2;

type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }


// 联合类型的交叉类型
// 既然只需要实现一个联合类型成员就能认为是实现了这个联合类型，那么各实现两边联合类型中的一个就行了，
// 也就是两边联合类型的**交集**
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string