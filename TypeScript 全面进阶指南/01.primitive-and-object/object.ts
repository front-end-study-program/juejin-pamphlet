// 对象的接口类型声明
interface IDescription {
  name: string;
  age: number;
  male: boolean;
}

const obj1: IDescription = {
  name: '',
  age: 599,
  male: true,
};

// 接口属性可选修饰符 ?
interface IDescription2 {
  name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const obj2: IDescription2 = {
  name: '',
  age: 599,
  male: true,
  // 无需实现 func 也是合法的
};

obj2.male = false;
obj2.func = () => {};

// 接口属性只读修饰符 readonly
interface IDescription3 {
  readonly name: string;
  age: number;
}

const obj3: IDescription3 = {
  name: '',
  age: 599,
};

// 无法分配到 "name" ，因为它是只读属性
obj3.name = '林不渡';

export {}