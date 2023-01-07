// 装饰器
// 装饰器的本质其实就是一个函数，只不过它的入参是提前确定好的。同时，TypeScript 中的装饰器目前只能在类以及类成员上使用

// 装饰器通过 @ 语法来使用
function Deco(value): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceProperty = value;
    target.newStaticProperty = `static ${value}`;
  };
}

@Deco('foo')
class Foo {}

// TypeScript 中的装饰器可以分为类装饰器、方法装饰器、访问符装饰器、属性装饰器以及参数装饰器五种
