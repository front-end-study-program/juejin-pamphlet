// 双重断言
// 当一个类型断言（as）到另外一个类型，差异太大时，
// 就需要使用双重断言，先断言为一个通用的类型，在断言到指定类型
const str: string = '';

(str as unknown as { handler: () => {} }).handler();
// 使用尖括号断言
(<{ handler: () => {} }>(<unknown>str)).handler();
