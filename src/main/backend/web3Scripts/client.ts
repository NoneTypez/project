import { Chain, createPublicClient, createWalletClient, http, WalletClient } from 'viem'
import {
  Account,
  generateMnemonic,
  english,
  generatePrivateKey,
  privateKeyToAccount,
  mnemonicToAccount
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
      const phrase = generateMnemonic(english)

      for (let i = 0; i < countOfWallet; i++) {
        const wallet = HDNodeWallet.fromPhrase(phrase, `m/44'/60'/0'/0/${i}`)
        wallets.push({ phrase, privatekey: wallet.privateKey, address: wallet.address })
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

  getWalletFromMnemonic(mnemoinc: string) {
    return mnemonicToAccount(mnemoinc)
  }
}

const crypto = new Crypto(process.env.ALCHEMYAPI)
export default crypto
