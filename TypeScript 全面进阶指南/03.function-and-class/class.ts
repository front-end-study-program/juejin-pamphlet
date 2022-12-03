// class 主要是对其构造函数、属性、方法、访问器进行类型标注

class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  // setter 方法不允许进行返回值的类型标注
  set propA(value: string) {
    this.prop = `${value}+A`
  }
}


// 类表达式
const Foo1 = class {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }
  
  // ...
}


// 修饰符
/**
 * public（访问性修饰符）：此类成员在类、类的实例、子类中都能被访问，默认值
 * private（访问性修饰符）：此类成员仅能在类的内部被访问
 * protected（访问性修饰符）：此类成员仅能在类与子类中被访问
 */

class Foo2 {
  private prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }
  
  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(value: string) {
    this.propA = `${value}+A`
  }
}

// 在构造函数中对参数应用访问性修饰符
// 参数会被直接作为类的成员（即实例的属性），免去后续的手动赋值
class Foo3 {
  constructor(public arg1: string, private arg2: boolean) { }
}

new Foo3("''", true)