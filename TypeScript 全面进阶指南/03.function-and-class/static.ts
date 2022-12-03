// 静态成员
// static 关键字标识类成员是个静态成员


class Foo {
  static staticHandler() { }

  public instanceHandler() { }
}


// 编译为 ES5 后
// var Foo = /** @class */ (function () {
//   function Foo() {
//   }
//   Foo.staticHandler = function () { };
//   Foo.prototype.instanceHandler = function () { };
//   return Foo;
// }());


export {}