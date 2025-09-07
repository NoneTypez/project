import { ElectronAPI } from '@electron-toolkit/preload'
import { IWalletPair } from './interfaces'
import { IProfile } from '@renderer/interfaces'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
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
        select: (
          tableName: string,
          columnNames: string[],
          WHEREoption?: object,
          multipleChoice: boolean
        ) => Promise<IProfile[]>

        insert: (
          tableName: string,
          columnNames: string[],
          values: string[],
          valuesToEncrypt?: Record<string, string>
        ) => Promise<unknown>

        delete: (tableName: string, whereClause: string, values: unknown[]) => Promise<unknown>
      }
      crypto: {
        generateWallet: (mode: string, countOfWallet?: number) => Promise<IWalletPair[]>
      }
    }
  }
}
