import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  logger: {
    log: (message) => ipcRenderer.invoke('log-info', message),
    info: (message) => ipcRenderer.invoke('log-info', message),
    warn: (message) => ipcRenderer.invoke('log-warn', message),
    error: (message) => ipcRenderer.invoke('log-error', message),
    success: (message) => ipcRenderer.invoke('log-success', message),

    getFile: () => ipcRenderer.invoke('get-log-file'),
    onUpdate: (callback) => {
      ipcRenderer.on('log-file-updated', (_, content) => callback(content))
    }
  },

  crypto: {
    generateWallet: (mode, count) => ipcRenderer.invoke('crypto:generateWallet', { mode, count }),

    getWalletFromMnemonic: (mnemonic) =>
      ipcRenderer.invoke('crypto:getWalletFromMnemonic', mnemonic)
  },

  db: {
    selectData: (table) => ipcRenderer.invoke('db:selectData', table),

    insertProfileData: (data) => ipcRenderer.invoke('db:insertProfileData', data),

    insertWalletData: (table, data) => ipcRenderer.invoke('db:insertWalletData', { table, data }),

    update: (table, id, data) => ipcRenderer.invoke('db:update', { table, id, data }),

    deleteData: (table, ids, columns) =>
      ipcRenderer.invoke('db:deleteData', { table, ids, columns })
  }
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
