// 使用字面量与联合类型，能得到更好的类型提示
interface Res {
  code: 10000 | 10001 | 50000;
  status: 'success' | 'failure';
  data: any;
}


// 字面量类型
// 字面量类型主要包括字符串字面量类型、数字字面量类型、布尔字面量类型和对象字面量类型，它们可以直接作为类型标注，更精准

const str: 'linbudu' = 'linbudu';
const num: 599 = 599;
const bool: true = true;

// 报错！
const str1: 'linbudu' = 'linbudu599';
const str2: string = 'linbudu';
const str3: string = 'linbudu599';


/**
 * 联合类型：一组类型的可用集合
 * 
 * 1.对于联合类型中的函数类型，需要使用括号()包裹起来
 * 2.函数类型并不存在字面量类型，因此这里的 (() => {}) 就是一个合法的函数类型
 * 3.你可以在联合类型中进一步嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中
 */
interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2);
}

interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}

// 使用联合类型来为一组字面量类型定义具体的名称
type Code = 10000 | 10001 | 50000;

type Status = 'success' | 'failure';

// 对象字面量类型
interface _Tmp {
  obj: {
    name: 'linbudu';
    age: 18;
  };
}

const _tmp: _Tmp = {
  obj: {
    name: 'linbudu',
    age: 18,
  },
};