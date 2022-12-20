// 如何比较函数的签名类型
// 实际上我们要比较的即是参数类型与返回值类型

class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}


type DogFactory = (args: Dog) => Dog;

function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog());
  dog.bark();
}


// 调用时只可能接受 Dog 类型或 Dog 类型的子类型，而不能接受 Dog 类型的父类型
function makeDogBark(dog: Dog) {
  dog.bark();
}
makeDogBark(new Corgi()); // 没问题
makeDogBark(new Animal()); // 不行


/**
 * 里氏替换原则：
 * 1.子类可以扩展父类的功能，但不能改变父类原有的功能，
 * 2.子类型（subtype）必须能够替换掉他们的基类型（base type）。
 * 对于这两条约束依次进行检查：
 * 入参 -> 出参
 * 基于 Dog -> Dog 做比较
 * Animal -> Animal
 * Animal -> Dog
 * Animal -> Corgi
 * Dog -> Dog
 * Dog -> Animal
 * Dog -> Corgi
 * Corgi -> Animal
 * Corgi -> Dog
 * Corgi -> Corgi
 */

// 对于 Animal/Dog/Corgi -> Animal 类型
// 无论它的参数类型是什么，它的返回值类型都是不满足条件的。
// 因为它返回的不一定是合法的狗狗，即我们说它不是 Dog -> Dog 的子类型

// 对于 Corgi -> Corgi 与 Corgi -> Dog，
// 其返回值满足了条件，但是参数类型又不满足了。
// 这两个类型需要接受 Corgi 类型，可能内部需要它腿短的这个特性。
// 但我们可没说一定会传入柯基，如果我们传个德牧，程序可能就崩溃了。

// 对于 Dog -> Corgi、Animal -> Corgi、Animal -> Dog，
// 首先它们的参数类型正确的满足了约束，能接受一只狗狗。
// 其次，它们的返回值类型也一定会能汪汪汪。

// 观察以上排除方式的结论：
// 参数类型允许为 Dog 的父类型，不允许为 Dog 的子类型。
// 返回值类型允许为 Dog 的子类型，不允许为 Dog 的父类型。

// 协变与逆变
// 随着某一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变。
// 即如果有 A ≼ B ，协变意味着 Wrapper<A> ≼ Wrapper<B>，而逆变意味着 Wrapper<B> ≼ Wrapper<A>。

type AsFuncArgType<T> = (arg: T) => void;
type AsFuncReturnType<T> = (arg: unknown) => T;

// A ≼ B 意为 A 为 B 的子类型
// 2 不成立：(Dog -> T) ≼ (Animal -> T)
type CheckArgType1 = AsFuncArgType<Dog> extends AsFuncArgType<Corgi> ? 1 : 2;

type CheckArgType = AsFuncArgType<Dog> extends AsFuncArgType<Animal> ? 1 : 2;


// 1 成立：(T -> Corgi) ≼ (T -> Dog)
type CheckReturnType = AsFuncReturnType<Corgi> extends AsFuncReturnType<Dog>
  ? 1
  : 2;

  type CheckReturnType1 = AsFuncReturnType<Animal> extends AsFuncReturnType<Dog>
  ? 1
  : 2;

// 总结：函数类型的参数类型使用子类型逆变的方式确定是否成立，而返回值类型使用子类型协变的方式确定。


export {}