// 方法装饰器
// 方法装饰器的入参包括类的原型、方法名以及方法的属性描述符（PropertyDescriptor），
// 而通过属性描述符你可以控制这个方法的内部实现（即 value）、可变性（即 writable）等信息
// 方法装饰器的 target 是类的原型而非类本身

export class Foo {
  @ComputeProfiler()
  async fetch() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('RES');
      }, 3000);
    });
  }
}

function ComputeProfiler(): MethodDecorator {
  return (
    _target,
    methodIdentifier,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const originalMethodImpl = descriptor.value!;
    descriptor.value = async function (...args: unknown[]) {
      const start = new Date();
      const res = await originalMethodImpl.apply(this, args); // 执行原本的逻辑
      const end = new Date();
      console.log(
        `${String(methodIdentifier)} Time: `,
        end.getTime() - start.getTime()
      );
      return res;
    };
  };
}

(async () => {
  console.log(await new Foo().fetch());
})();