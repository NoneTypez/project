interface IWalletPair {
  seed?: string
  privatekey: string
  address: string
}

interface IWalletsPairs {
  wallets: IWalletPair[]
}

export type { IWalletPair, IWalletsPairs }
