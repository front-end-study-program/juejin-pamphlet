// 判断传入的字符串字面量类型中是否含有某个字符串

type _Include<
  Str extends string,
  Search extends string
> = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;

type Include<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : false
  : _Include<Str, Search>;

type IncludeRes1 = Include<'foo', 'oo'>; // true
type IncludeRes2 = Include<'bar', '_bar'>; // false
type IncludeRes3 = Include<'zoo', ''>; // true
type IncludeRes4 = Include<' ', ''>; // true
type IncludeRes5 = Include<'', ''>; // true