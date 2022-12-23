// 模板字符串类型的类型表现

// 由于模板字符串类型最终的产物还是字符串字面量类型，因此只要插槽位置的类型匹配，字符串字面量类型就可以被认为是模板字符串类型的子类型
declare let v1: `${number}.${number}.${number}`;
declare let v2: '1.2.4';

v1 = v2;


const greet = (to: string): `Hello ${string}` => {
  return `Hello ${to}`;
};