// 函数中的泛型

function handle<T>(input: T): T {
  return input
}

const author = "foo";
let authorAge = 18;

handle(author) // 填充为字面量类型 "foo"
handle(authorAge) // 填充为基础类型 number

function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped1 = swap(["", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "" }, {}]);

// 泛型与类型约束
function swap1<T extends number, U extends number>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

swap1([1, 3])
swap1(['1', 3])

// lodash 的 pick 函数，这个函数首先接受一个对象，然后接受一个对象属性名组成的数组，并从这个对象中截取选择的属性部分
const object = { 'a': 1, 'b': '2', 'c': 3 };
// _.pick(object, ['a', 'c']); => { 'a': 1, 'c': 3 }

type pickType = <T extends object, U extends keyof T>(object: T, ...props: Array<U>) => Pick<T, U> 


// 函数的泛型参数也会被内部的逻辑消费
function handle1<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload]);
  });
}