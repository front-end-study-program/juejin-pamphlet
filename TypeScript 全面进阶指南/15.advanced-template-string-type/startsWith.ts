// StartsWith

type _StartsWith<
  Str extends string,
  Search extends string
> = Str extends `${Search}${infer _R}` ? true : false;


type StartsWith<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : _StartsWith<Str, Search>
  : _StartsWith<Str, Search>;


  type StartsWithRes1 = StartsWith<'foo', 'fo'>; // true
type StartsWithRes2 = StartsWith<'bar', ''>; // true
type StartsWithRes3 = StartsWith<'zoo', ' '>; // false
type StartsWithRes4 = StartsWith<'', ''>; // true
type StartsWithRes5 = StartsWith<' ', ''>; // true