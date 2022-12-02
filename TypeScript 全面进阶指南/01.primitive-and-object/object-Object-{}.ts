/**
 * Object、object 以及{}
 * 1. 在任何时候都不要，不要，不要使用 Object 以及类似的装箱类型。
 * 2. 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。
 * 更好的方式是使用 Record<string, unknown> 或 Record<string, any> 表示对象，
 * unknown[] 或 any[] 表示数组，(...args: any[]) => any表示函数这样。
 * 3. 避免使用{}。{}意味着任何非 null / undefined 的值，从这个层面上看，使用它和使用 any 一样恶劣。
 */


// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
const tmp1: Object = undefined;
const tmp2: Object = null;
const tmp3: Object = void 0;
const tmp4: Object = 'linbudu';
const tmp5: Object = 599;
const tmp6: Object = { name: 'linbudu' };
const tmp7: Object = () => {};
const tmp8: Object = [];

// 和 Object 类似的还有 Boolean、Number、String、Symbol，这几个装箱类型（Boxed Types） 同样包含了一些超出预期的类型。
// 以 String 为例，它同样包括 undefined、null、void，以及代表的 拆箱类型（Unboxed Types） string，
// 但并不包括其他装箱类型对应的拆箱类型
const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;
const tmp12: String = 'linbudu';

// 以下不成立，因为不是字符串类型的拆箱类型
const tmp13: String = 599; // X
const tmp14: String = { name: 'linbudu' }; // X
const tmp15: String = () => {}; // X
const tmp16: String = []; // X

// 注意：在任何情况下，都不应该使用这些装箱类型。


// object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型这些：
const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = 'linbudu';  // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: 'linbudu' };
const tmp23: object = () => {};
const tmp24: object = [];


// {}
const tmp25: {} = undefined;
const tmp26: {} = null;
const tmp27: {} = void 0;
const tmp28: {} = 'linbudu';
const tmp29: {} = 599;
// 虽然能够将其作为变量的类型，但实际上无法对这个变量进行任何赋值操作
const tmp30: {} = { name: 'linbudu' };
tmp30.age = 18;
const tmp31: {} = () => {};
const tmp32: {} = [];

export {};