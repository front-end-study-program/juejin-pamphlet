// 类型断言 as newType
// 类型断言能够显式告知类型检查程序当前这个变量的类型
const str: string = '';

(str as any).func().foo().prop;

function foo1(union: string | number) {
  if ((union as string).includes('')) {
  }

  if ((union as number).toFixed() === '599') {
  }
}

interface IFoo {
  name: string;
}

declare const obj: {
  foo: IFoo;
};

const { foo = {} as IFoo } = obj;


// 类型断言还有一种用法是作为代码提示的辅助工具
interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
// 定义一个初始的对象，不想声明具体某个值。
// 以下的方式会报错
const obj1: IStruct = {};
// 使用类型断言，不会报错，有能得到良好的类型提示
const obj2 = <IStruct>{
  bar: {
    baz: {},
  },
};

obj2.bar.baz.handler()

export {};
