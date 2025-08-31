/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Chain, createPublicClient, createWalletClient, http, WalletClient } from 'viem'
import {
  Account,
  generateMnemonic,
  english,
  generatePrivateKey,
  privateKeyToAccount
} from 'viem/accounts'
import { HDNodeWallet } from 'ethers'
import { IWalletPair } from './interfaces'

class Crypto {
  alchemyAPI: string

  constructor(alchemyAPI?: string) {
    if (alchemyAPI) {
      this.alchemyAPI = alchemyAPI
    } else {
      this.alchemyAPI = ''
    }
  }

  chain(chain: Chain, RPC: string) {
    return createPublicClient({
      chain: chain,
      transport: http(RPC + this.alchemyAPI)
    })
  }

  wallet(account: Account, chain: Chain, RPC: string): WalletClient {
    return createWalletClient({
      account: account,
      chain: chain,
      transport: http(RPC + this.alchemyAPI)
    })
  }

  generateWallet(
    mode: 'fromMnemonic' | 'fromPrivateKey',
    countOfWallet: number = 1
  ): IWalletPair[] {
    const wallets: IWalletPair[] = []

    if (mode === 'fromMnemonic') {
      const seed = generateMnemonic(english)

      for (let i = 0; i < countOfWallet; i++) {
        const wallet = HDNodeWallet.fromPhrase(seed, `m/44'/60'/0'/0/${i}`)
        wallets.push({ seed, privatekey: wallet.privateKey, address: wallet.address })
      }
    } else {
      for (let i = 0; i < countOfWallet; i++) {
        const privatekey = generatePrivateKey()
        const wallet = privateKeyToAccount(privatekey)
        wallets.push({ privatekey, address: wallet.address })
      }
    }

    return wallets
  }
}

const crypto = new Crypto(process.env.ALCHEMYAPI)
console.log(crypto.generateWallet('fromMnemonic', 15))
export default crypto
