// 空值合并
// 空值合并就是为了取代逻辑或（||）。而逻辑或的主要使用场景之一就是提供默认值

const someValue = '';
const fallbackValue = 'fallback'

// 左边为假值，就会应用右边的值
const foo = someValue || fallbackValue;


// 仅在左边为 undefined 或 null 时，才去应用右边的值
const foo1 = someValue ?? fallbackValue;