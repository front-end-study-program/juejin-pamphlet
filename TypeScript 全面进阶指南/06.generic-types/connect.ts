// 多泛型关联

type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<'', string, 'passed!', 'rejected!'>;

// "rejected!"
type Result2 = Conditional<'', boolean, 'passed!', 'rejected!'>;

// 多个泛型参数之间的依赖

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;