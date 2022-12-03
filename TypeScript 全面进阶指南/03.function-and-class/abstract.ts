// 抽象类 abstract
// 抽象类描述了一个类中应当有哪些成员（属性、方法等），一个抽象方法描述了这一方法在实际实现中的结构

abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string
}

// implements 实现抽象类
class Foo implements AbsFoo {
  absProp: string = ""

  get absGetter() {
    return ""
  }

  absMethod(name: string) {
    return name
  }
}


// interface 接口抽象定义
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string
}

class Foo1 implements FooStruct {
  absProp: string = ""

  get absGetter() {
    return ""
  }

  absMethod(name: string) {
    return name
  }
}

// Newable Interface 来描述一个类的结构
class Foo2 { }

interface FooStruct {
  new(): Foo2
}

declare const NewableFoo: FooStruct;

const foo2 = new NewableFoo();

export {}