// 属性修饰工具类型
// 属性修饰、映射类型与索引类型

// 可选
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// 必填
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// 只读
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 可写
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};