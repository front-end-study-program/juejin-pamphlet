// 模板字符串类型与模式匹配

type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}` ? `${Capitalize<Last>} ${First}` : Str;

type ReversedTomHardy = ReverseName<'Tom hardy'>; // "Hardy Tom"

type ReversedRes1 = ReverseName<'foo bar 599'>;


declare function handler<Str extends string>(arg: `Guess who is ${Str}`): Str;

handler(`Guess who is foo`); // "foo"
handler(`Guess who is `); // ""
handler(`Guess who is  `); // " "

handler(`Guess who was`); // Error
handler(``); // Error