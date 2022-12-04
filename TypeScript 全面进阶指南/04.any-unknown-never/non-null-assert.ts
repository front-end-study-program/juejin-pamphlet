// 非空断言 !
// 非空断言其实是类型断言的简化
// 实际上就是剔除了 null 和 undefined 类型

declare const foo: {
  func?: () => {
    prop?: number | null;
  };
};

foo.func().prop.toFixed();

foo.func!().prop!.toFixed();

foo.func?.().prop?.toFixed();

(
  (
    foo.func as () => {
      prop?: number;
    }
  )().prop as number
).toFixed();

const element = document.querySelector('#id')!;
const target = [1, 2, 3, 599].find((item) => item === 599)!;

export {};
