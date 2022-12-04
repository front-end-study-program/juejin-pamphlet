// never
// never 是一个“什么都没有”的类型
// never 类型不携带任何的类型信息
// 在联合类型中被直接移除

type UnionWithNever = '' | 599 | true | void | never;

function justThrow(): never {
  throw new Error();
}


// 对于处理不到的分支语句，使用 never 类型进行处理，会得到友好的提示
declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === 'string') {
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === 'number') {
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === 'boolean') {
  strOrNumOrBool === true;
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
