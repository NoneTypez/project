import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import crypto from '../main/backend/web3Scripts/client'
import { HDAccount } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { IProfile, IWallet, TABLES } from '../main/backend/db/db_types'
import { db } from '../main/backend/db/dbEngine'

// Custom APIs for renderer
const api = {
  logger: {
    log: (message: string) => ipcRenderer.invoke('log-info', message),
    info: (message: string) => ipcRenderer.invoke('log-info', message),
    warn: (message: string) => ipcRenderer.invoke('log-warn', message),
    error: (message: string) => ipcRenderer.invoke('log-error', message),
    success: (message: string) => ipcRenderer.invoke('log-success', message),

    // 🔥 вот это нужно реально прописать тут
    getFile: () => ipcRenderer.invoke('get-log-file'),
    onUpdate: (callback: (content: string) => void) => {
      ipcRenderer.on('log-file-updated', (_, content) => callback(content))
    }
  },
  crypto: {
    generateWallet: (mode: string, count?: number): Promise<IWallet[]> => {
      // Вызываем локальную функцию crypto.generateWallet, возвращаем как Promise
      return Promise.resolve(crypto.generateWallet(mode as any, count))
    },
    getWalletFromMnemonic: (mnemonic: string): Promise<IWallet> => {
      return Promise.resolve(crypto.getWalletFromMnemonic(mnemonic))
    }
  }
  // db: {
  //   selectData: (table: TABLES | '*') => db.selectData(table),
  //   insertProfileData: (data: IProfile) => db.insertProfileData(data),
  //   insertWalletData: (table: TABLES, data: IWallet[]) => db.insertWalletData(table, data),
  //   update: (table: TABLES, id: number, data: Partial<IProfile | IWallet>) =>
  //     db.update(table, id, data),
  //   deleteData: (table: TABLES, ids: number | number[], columns?: string[]) =>
  //     db.deleteData(table, ids, columns)
  // }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close')
})
