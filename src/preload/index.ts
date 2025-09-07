import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

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
