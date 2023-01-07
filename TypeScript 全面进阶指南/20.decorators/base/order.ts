// 装饰器的执行机制
// 主要包括执行时机、执行原理以及执行顺序这三个概念

// 执行顺序：
// 1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
// 2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
// 3. 参数装饰器应用到构造函数。
// 4. 类装饰器应用到类。


function Deco(identifier: string): any {
  console.log(`${identifier} 执行`);
  return function () {
    console.log(`${identifier} 应用`);
  };
}

@Deco('类装饰器')
export class Foo {
  constructor(@Deco('构造函数参数装饰器') name: string) {}

  @Deco('实例属性装饰器')
  prop?: number;

  @Deco('实例方法装饰器')
  handler(@Deco('实例方法参数装饰器') args: any) {}
}

// 顺序大致是实例属性-实例方法参数-构造函数参数-类

// 实例属性装饰器 执行
// 实例属性装饰器 应用
// 实例方法装饰器 执行
// 实例方法参数装饰器 执行
// 实例方法参数装饰器 应用
// 实例方法装饰器 应用
// 类装饰器 执行
// 构造函数参数装饰器 执行
// 构造函数参数装饰器 应用
// 类装饰器 应用


// 多个同类装饰器的执行顺序
// @Deprecated()
// @User()
// @Internal
// @Provide()
// class Foo {}

// 由上至下执行，从下往上调用
function Foo1(): MethodDecorator {
  console.log('foo1 in');
  return (target, propertyKey, descriptor) => {
    console.log('foo1 out');
  };
}

function Bar(): MethodDecorator {
  console.log('bar in');
  return (target, propertyKey, descriptor) => {
    console.log('bar out');
  };
}

const Baz: MethodDecorator = () => {
  console.log('baz apply');
};

class User {
  @Foo1()
  @Bar()
  @Baz
  method() {}
}

// foo1 in
// bar in
// baz apply
// bar out
// foo1 out