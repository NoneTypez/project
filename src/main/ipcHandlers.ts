import { ipcMain, BrowserWindow } from 'electron'
import logger from '../main/backend/logger'
import crypto from '../main/backend/web3Scripts/client'
import { db } from '../main/backend/db/dbEngine'
import { IProfile, IWallet, TABLES } from './backend/db/db_types'

export function registerIPCHandlers(mainWindow: BrowserWindow): void {
  // --- LOGGER API ---
  logger.setupIPC()

  ipcMain.handle('get-log-file', () => {
    return logger.getLogFileContent()
  })

  // --- CRYPTO API ---
  ipcMain.handle('crypto:generateWallet', (_, args: { mode: string; count?: number }) => {
    return crypto.generateWallet(args.mode as any, args.count)
  })

  ipcMain.handle('crypto:getWalletFromMnemonic', (_, mnemonic: string) => {
    return crypto.getWalletFromMnemonic(mnemonic)
  })

  // --- DATABASE API ---
  ipcMain.handle('db:selectData', (_, table) => db.selectData(table))

  ipcMain.handle('db:insertProfileData', (_, data) => db.insertProfileData(data))

  ipcMain.handle('db:insertWalletData', (_, args: { table: TABLES; data: IWallet[] }) =>
    db.insertWalletData(args.table, args.data)
  )

  ipcMain.handle(
    'db:update',
    (_, args: { table: TABLES; id: number; data: Partial<IProfile | IWallet> }) =>
      db.update(args.table, args.id, args.data)
  )

  ipcMain.handle(
    'db:deleteData',
    (_, args: { table: TABLES; ids: number | number[]; columns?: string[] }) =>
      db.deleteData(args.table, args.ids, args.columns)
  )

  // --- WINDOW CONTROL ---
  ipcMain.on('window:minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.minimize()
  })

  ipcMain.on('window:maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.isMaximized() ? win.unmaximize() : win?.maximize()
  })

  ipcMain.on('window:close', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.close()
  })
}
