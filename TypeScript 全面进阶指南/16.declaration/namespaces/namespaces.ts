// 命名空间
export namespace RealCurrency {
  export class WeChatPaySDK {}

  export class ALiPaySDK {}

  export class MeiTuanPaySDK {}

  export class CreditCardPaySDK {}
}
// 命名空间内部实际上就像是一个独立的代码文件
// 因此其中的变量需要导出以后，才能通过 RealCurrency.WeChatPaySDK 这样的形式访问
const weChatPaySDK = new RealCurrency.WeChatPaySDK();


export namespace VirtualCurrency {
  export class QQCoinPaySDK {}

  // 命名空间嵌套使用
  export namespace BlockChainCurrency {
    export class BitCoinPaySDK {}

    export class ETHPaySDK {}
  }
}

const ethPaySDK = new VirtualCurrency.BlockChainCurrency.ETHPaySDK();