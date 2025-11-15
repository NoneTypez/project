interface IWalletPair {
  phrase?: string
  privateKey: string | Uint8Array<ArrayBufferLike> | null
  address: string
}

interface IWalletsPairs {
  wallets: IWalletPair[]
}

export type { IWalletPair, IWalletsPairs }
