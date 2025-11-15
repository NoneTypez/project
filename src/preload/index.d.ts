import { ElectronAPI } from '@electron-toolkit/preload'
import { IWalletPair } from './interfaces'
import { IProfile } from '@renderer/interfaces'
import { HDAccount } from 'viem'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      titleBar: {
        minimize: () => Promise<void>
        maximize: () => Promise<void>
        close: () => Promise<void>
      }
      logger: {
        log: (message: string) => Promise<void>
        info: (message: string) => Promise<void>
        warn: (message: string) => Promise<void>
        error: (message: string) => Promise<void>
        success: (message: string) => Promise<void>
        getFile: () => Promise<string> // <-- правильный тип
        onUpdate: (callback: (content: string) => void) => void
      }
      db: {
        selectData: (from: TABLES | '*') => Promise<{
          profiles?: IProfile[]
          projects?: unknown[]
          fees?: unknown[]
          earnings?: unknown[]
          evm_wallets?: IWallet[]
          sol_wallets?: IWallet[]
          btc_wallets?: IWallet[]
          atom_wallets?: IWallet[]
          ton_wallets?: IWallet[]
        }>

        insertProfileData: (inputData: IProfile) => Promise<void>

        insertWalletData: (tableName: TABLES, inputData: IWallet[]) => Promise<void>

        update: (
          inTable: TABLES,
          id: number,
          updateData: Partial<IProfile | IWallet>
        ) => Promise<void>

        deleteData: (table: TABLES, ids: number | number[], columns?: string[]) => Promise<void>
      }
      crypto: {
        generateWallet: (mode: string, countOfWallet?: number) => Promise<IWalletPair[]>
        getWalletFromMnemonic: (mnemonic: string) => IWalletPair
      }
    }
  }
}
