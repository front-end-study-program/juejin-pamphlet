// 结构化类型系统
// ts 比较两个类型是通过其实例上拥有的属性和方法
class Cat {
  // 新增 meow 方法之后，Dog 的结构类型就无法满足 Cat
  // meow() { }
  eat() {}
}

class Dog {
  // 即使新增 bark 类型，在 ts 中，Dog 也完全满足于 Cat 的类型结构。视为相同
  bark() { }
  eat() {}
}

function feedCat(cat: Cat) {}

feedCat(new Dog());
