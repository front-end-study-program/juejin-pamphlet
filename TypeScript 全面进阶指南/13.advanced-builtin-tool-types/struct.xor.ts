// 基于结构的互斥工具类型
// 场景：VIP 用户和普通用户、游客这三种类型的用户各自拥有一些独特的字段，
// 如 vipExpires 代表 VIP 过期时间，仅属于 VIP 用户，
// promotionUsed 代表已领取过体验券，属于普通用户，
// 而 refererType 代表跳转来源，属于游客
import { expectType } from 'tsd';

interface VIP {
  vipExpires: number;
}

interface CommonUser {
  promotionUsed: boolean;
}

interface Visitor {
  refererType: string;
}


// 联合类型并不会约束“不能同时拥有”这个条件
type User = VIP | CommonUser;
const user1: User = {
  vipExpires: 599,
  promotionUsed: false,
};

// 为了表示不能同时拥有，使用 never 类型来标记一个属性
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
type XORUser = XOR<VIP, CommonUser>;

expectType<XORUser>({
  vipExpires: 0,
});

expectType<XORUser>({
  promotionUsed: false,
});

// 报错，至少需要一个
expectType<XORUser>({});

// 报错，不允许同时拥有
expectType<XORUser>({
  promotionUsed: false,
  vipExpires: 0,
});

// 对 Without 进行展开
type Flatten<T> = { [K in keyof T]: T[K] }
// {
//    vipExpires?: never;
// }
type Tmp1 = Flatten<Without<VIP, CommonUser>>;

// {
//    vipExpires?: never;
//    promotionUsed: boolean;
// }
type Tmp2 = Flatten<Tmp1 & CommonUser>;

// 联合类型会自动合并重复的部分
type XORUser1 = XOR<VIP, XOR<CommonUser, Visitor>>;



// 互斥类型实现绑定效果，即要么同时拥有 A、B 属性，要么一个属性都没有
type XORStruct = XOR<
  {},
  {
    foo: string;
    bar: number;
  }
>;

// 没有 foo、bar
expectType<XORStruct>({});

// 同时拥有 foo、bar
expectType<XORStruct>({
  foo: 'foo',
  bar: 599,
});

expectType<XORStruct>({
  bar: 599,
});


export {}