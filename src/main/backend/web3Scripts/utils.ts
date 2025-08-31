import { HDNodeWallet } from 'ethers'
import { encrypt } from '../db/crypt'

export function createEmvDataToInsert(phrase: string): object {
  const wallet = HDNodeWallet.fromPhrase(phrase)
  const result = {
    evm_seed: `ENC:${encrypt(phrase)}`,
    evm_privatekey: `ENC:${encrypt(wallet.address)}`,
    evm_address: `ENC:${encrypt(wallet.address)}`
  }
  return result
}

export function createSolDataToInsert(phrase: string): object {
  const result = {
    sol_seed: `ENC:${encrypt(phrase)}`,
    sol_privatekey: '-',
    sol_address: '-'
  }
  return result
}

export function createBtcDataToInsert(phrase: string): object {
  const result = {
    btc_seed: `ENC:${encrypt(phrase)}`,
    btc_privatekey: '-',
    btc_address: '-'
  }
  return result
}

export function createAtomDataToInsert(phrase: string): object {
  const result = {
    atom_seed: `ENC:${encrypt(phrase)}`,
    atom_privatekey: '-',
    atom_address: '-'
  }
  return result
}

export function createTonDataToInsert(phrase: string): object {
  const result = {
    ton_seed: `ENC:${encrypt(phrase)}`,
    ton_privatekey: '-',
    ton_address: '-'
  }
  return result
}
