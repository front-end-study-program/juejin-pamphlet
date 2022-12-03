const uniqueSymbolFoo: unique symbol = Symbol('');

// 类型不兼容
const uniqueSymbolBar: unique symbol = uniqueSymbolFoo;

const uniqueSymbolBaz: typeof uniqueSymbolFoo = uniqueSymbolFoo;
