// 数组类型的定义方式
const arr1: string[] = [];

const arr2: Array<string> = [];

// 元组（Tuple）
const arr3: string[] = ['lin', 'bu', 'du'];

console.log(arr3[599]);

const arr4: [string, string, string] = ['lin', 'bu', 'du'];

const arr5: [string, number, boolean] = ['linbudu', 599, true];

console.log(arr4[599]);

const arr6: [string, number?, boolean?] = ['linbudu'];

// 这么写也可以
// const arr6: [string, number?, boolean?] = ['linbudu', , ,];

type TupleLength = typeof arr6.length; // 1 | 2 | 3

// TS 4.0 具名元组
const arr7: [name: string, age: number, male: boolean] = ['linbudu', 599, true];

const [name, age, male, other] = arr5;

export {};
