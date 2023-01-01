import { Split } from './split';
import { Trim } from './trim';

export type StrLength<T extends string> = Split<Trim<T>, ''>['length'];

type StrLengthRes1 = StrLength<'foo'>;
type StrLengthRes2 = StrLength<'bar zoo'>;
type StrLengthRes3 = StrLength<''>;
type StrLengthRes4 = StrLength<' '>;
