// 继承 extends
class Base { }
class Derived extends Base { }


// override 关键字
// 确保派生类尝试覆盖的方法一定在基类中存在定义
class Base1 {
  printWithLove() { }
}

class Derived1 extends Base {
  override print() {
    // ...
  }
}

