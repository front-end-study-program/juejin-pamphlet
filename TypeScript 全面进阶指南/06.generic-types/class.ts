// class 中的泛型
class Queue<TElementType> {
  private _list: TElementType[];

  constructor(initial: TElementType[]) {
    this._list = initial;
  }

  // 入队一个队列泛型子类型的元素
  enqueue<TType extends TElementType>(ele: TType): TElementType[] {
    this._list.push(ele);
    return this._list;
  }

  // 入队一个任意类型元素（无需为队列泛型子类型）
  enqueueWithUnknownType<TType>(element: TType): (TElementType | TType)[] {
    return [...this._list, element];
  }

  // 出队
  dequeue(): TElementType[] {
    this._list.shift();
    return this._list;
  }
}

// 内置方法中的泛型，如 Promise 中 resolve 方法会自动填充泛型类型
function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}

interface PromiseConstructor {
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
declare var Promise1: PromiseConstructor;

