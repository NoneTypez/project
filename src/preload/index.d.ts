import { ElectronAPI } from '@electron-toolkit/preload'
import { IWalletPair } from './interfaces'
import { IProfile } from '@renderer/interfaces'

declare global {
  interface Window {
    electron: ElectronAPI // Тип для API, предоставляемого Electron
    api: {
      // Тип для твоего объекта `api`
      logger: {
        log: (message: string) => Promise<void>
        info: (message: string) => Promise<void>
        warn: (message: string) => Promise<void>
        error: (message: string) => Promise<void>
        success: (message: string) => Promise<void>
      }
      db: {
        select: (
          tableName: string,
          columnNames: string[],
          WHEREoption?: object,
          multipleChoice: boolean = false
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
        generateWallet: (mode: string, countOfWallet: number = 1) => Promise<IWalletPair[]>
      }
    }
  }
}
