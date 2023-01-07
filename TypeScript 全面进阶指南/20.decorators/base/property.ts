// 属性装饰器
// 属性装饰器在独立使用时能力非常有限，它的入参只有类的原型与属性名称，返回值会被忽略.

export class Foo {
  @ModifyNickName()
  nickName!: string;
  constructor() {}
}

function ModifyNickName(): PropertyDecorator {
  return (target: any, propertyIdentifier) => {
    target[propertyIdentifier] = 'foo!';
    target['otherName'] = 'bar!';
  };
}

console.log(new Foo().nickName);
// @ts-expect-error
console.log(new Foo().otherName);