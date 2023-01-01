export type Split<
  Str extends string,
  Delimiter extends string
> = Str extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : Str extends Delimiter
  ? []
  : [Str];

type Delimiters = '-' | '_' | ' ';

type SplitRes1 = Split<'foo-bar-zoo', Delimiters>;

type SplitRes2 = Split<'foo bar zoo', Delimiters>;

type SplitRes3 = Split<'foo', Delimiters>;

type SplitRes4 = Split<'foo_bar_zoo', Delimiters>;

