// replace

export type Replace<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? `${Head}${Replacement}${Tail}`
  : Str;

type ReplaceRes1 = Replace<'foo', 'f', 'F'>;
type ReplaceRes2 = Replace<'bar', 'f', 'oo'>;

export type ReplaceAll<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? ReplaceAll<`${Head}${Replacement}${Tail}`, Search, Replacement>
  : Str;


type ReplaceAllRes1 = ReplaceAll<'foo', 'o', '1'>;
type ReplaceAllRes2 = ReplaceAll<'foo', '.', '-'>;