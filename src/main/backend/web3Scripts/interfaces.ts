interface IWalletPair {
  phrase?: string
  privatekey: string
  address: string
}

interface IWalletsPairs {
  wallets: IWalletPair[]
}

export type { IWalletPair, IWalletsPairs }
