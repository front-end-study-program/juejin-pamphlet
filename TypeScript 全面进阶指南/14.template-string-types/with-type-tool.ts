// 结合索引类型与映射类型

// 基于 keyof + 模板字符串类型，我们可以基于已有的对象类型来实现精确到字面量的类型推导
enum Job {}

interface Foo {
  name: string;
  age: number;
  job: Job;
}

type ChangeListener = {
  on: (change: `${keyof Foo}Changed`) => void;
};

declare let listener: ChangeListener;

// 提示并约束为 "nameChanged" | "ageChanged" | "jobChanged"
listener.on('ageChanged');


// TS 在引入模板字符串类型时支持了一个叫做 重映射（Remapping） 的新语法，
// 基于模板字符串类型与重映射，我们可以实现一个此前无法想象的新功能：在映射键名时基于原键名做修改。
type Copy<T extends object> = {
  [K in keyof T]: T[K];
};

type CopyWithRename<T extends object> = {
  [K in keyof T as `modified_${string & K}`]: T[K];
};

interface Foo {
  name: string;
  age: number;
}

// {
//   modified_name: string;
//   modified_age: number;
// }
type CopiedFoo = CopyWithRename<Foo>;