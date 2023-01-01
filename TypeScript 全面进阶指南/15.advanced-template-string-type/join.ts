export type Join<
  List extends Array<string | number>,
  Delimiter extends string
> = List extends []
  ? ''
  : List extends [string | number]
  ? `${List[0]}`
  : List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : string;

  type JoinRes1 = Join<['foo', 'bar', 'zoo'], '-'>;