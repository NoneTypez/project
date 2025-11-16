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
import { IWallet } from '../db/db_types'
import { validateMnemonic } from 'bip39'

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

  _getPrivateKeyFromUnit8(unit8PK: Uint8Array<ArrayBufferLike> | null): string {
    if (!unit8PK) {
      throw new Error('Private key is null')
    }
    return '0x' + Buffer.from(unit8PK).toString('hex')
  }

  generateWallet(mode: 'withMnemonic' | 'withoutMnemonic', countOfWallet: number = 1): IWallet[] {
    const wallets: IWallet[] = []

    if (mode === 'withMnemonic') {
      const phrase = generateMnemonic(english)

      for (let i = 0; i < countOfWallet; i++) {
        const wallet = HDNodeWallet.fromPhrase(phrase, `m/44'/60'/0'/0/${i}`)
        wallets.push({ phrase, privateKey: wallet.privateKey, address: wallet.address })
      }
    } else {
      for (let i = 0; i < countOfWallet; i++) {
        const privateKey = generatePrivateKey()
        const wallet = privateKeyToAccount(privateKey)
        wallets.push({ privateKey, address: wallet.address })
      }
    }
    return wallets
  }

  getWalletFromMnemonic(mnemonic: string): IWallet {
    if (!validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic phrase')
    }
    const account = mnemonicToAccount(mnemonic)
    const result = {
      phrase: mnemonic,
      privateKey: this._getPrivateKeyFromUnit8(account.getHdKey().privateKey),
      address: account.address
    }
    return result
  }
}

const crypto = new Crypto(process.env.ALCHEMYAPI)
export default crypto
