// 异步函数、Generator 函数等类型签名


// 异步函数
async function asyncFunc(): Promise<void> {}

// Generator 函数
function* genFunc(): Iterable<void> {}

// 异步 Generator 函数
async function* asyncGenFunc(): AsyncIterable<void> {}