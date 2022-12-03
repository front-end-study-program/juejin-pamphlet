// 枚举
enum PageUrl {
  Home_Page_Url = 'url1',
  Setting_Page_Url = 'url2',
  Share_Page_Url = 'url3',
}

const home = PageUrl.Home_Page_Url;

// 没有设置值，默认从 0 开始递增
enum Items {
  Foo, // 0
  Bar, // 1
  Baz, // 2
}

// 如果只指定了某个值，之前的会从 0 开始递增，之后的会从设置的值开始递增
enum Items1 {
  // 0
  Foo,
  Bar = 599,
  // 600
  Baz,
}

// 在数字型枚举中，可以使用延迟求值的枚举值

const returnNum = () => 100 + 499;

enum Items2 {
  Foo = returnNum(),
  Bar = 599,
  Baz
}

// 但要注意，延迟求值的枚举值是有条件的。
// 如果你使用了延迟求值，那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后（如上例），
// 或者放在第一位
enum Items3 {
  Baz,
  Foo = returnNum(),
  Bar = 599,
}

// 字符串枚举值和数字枚举值
enum Mixed {
  Num = 599,
  Str = ""
}


// 枚举和对象的重要差异在于，对象是单向映射的，我们只能从键映射到键值。
// 而枚举是双向映射的，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员
// 仅有值为数字的枚举成员才能够进行这样的双向枚举，字符串枚举成员仍然只会进行单次映射
enum Items4 {
  Foo,
  Bar,
  Baz
}

const fooValue = Items4.Foo; // 0
const fooKey = Items4[0]; // "Foo"
// 编译后
// "use strict";
// var Items4;
// (function (Items4) {
//     Items4[Items["Foo"] = 0] = "Foo";
//     Items4[Items["Bar"] = 1] = "Bar";
//     Items4[Items["Baz"] = 2] = "Baz";
// })(Items4 || (Items4 = {}));


// 常量枚举
// 常量枚举和枚举相似，只是其声明多了一个 const
// 注意：单向映射，编译后为具体的值，不会生成上例的代码
const enum Items5 {
  Foo,
  Bar,
  Baz
}

const fooValue1 = Items5.Foo; // 0
// 编译后
// const fooValue1 = 0 /* Foo */; // 0