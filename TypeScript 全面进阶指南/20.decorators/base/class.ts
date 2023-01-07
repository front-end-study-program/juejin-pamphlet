// 类装饰器
// 类装饰器是直接作用在类上的装饰器，它在执行时的入参只有一个，那就是这个类本身（而不是类的原型对象）。
// 我们可以通过类装饰器来覆盖类的属性与方法，如果你在类装饰器中返回一个新的类，它甚至可以篡改掉整个类的实现。

@AddProperty('foo')
@AddMethod()
export class Foo {
  a = 1;
}

function AddMethod(): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceMethod = () => {
      console.log("Let's add a new instance method!");
    };
    target.newStaticMethod = () => {
      console.log("Let's add a new static method!");
    };
  };
}

function AddProperty(value: string): ClassDecorator {
  return (target: any) => {
    target.prototype.newInstanceProperty = value;
    target.newStaticProperty = `static ${value}`;
  };
}

const foo: any = new Foo();

foo.newInstanceMethod();
(<any>Foo).newStaticMethod();

console.log(foo.newInstanceProperty);
console.log((<any>Foo).newStaticProperty);



// 在装饰器中返回一个子类
const OverrideBar = (target: any) => {
  return class extends target {
    print() {}
    overridePrint() {
      console.log('This is Override Bar!');
    }
  };
};

@OverrideBar
class Bar {
  print() {
    console.log('This is Bar!');
  }
}

// 被覆盖了，现在是一个空方法
new Bar().print();

// This is Override Bar!
(<any>new Bar()).overridePrint();