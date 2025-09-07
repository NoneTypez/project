import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import logger from './backend/logger'
import { db } from './backend/db/dbEngine'
import fs from 'fs'

const logFile = path.join(app.getPath('userData'), 'app.log')

// 👉 функция чтения файла целиком
function getLogFileContent(): string {
  if (!fs.existsSync(logFile)) return ''
  return fs.readFileSync(logFile, 'utf-8')
}

// 👉 следим за изменениями файла
function watchLogFile(mainWindow: BrowserWindow): void {
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, '', 'utf-8')
  }

  fs.watchFile(logFile, { interval: 1000 }, () => {
    const content = getLogFileContent()
    mainWindow.webContents.send('log-file-updated', content)
  })
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minHeight: 800,
    minWidth: 1200,
    width: 1200,
    height: 800,
    resizable: true,
    frame: false, // убираем стандартные кнопки везде
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    logger.log('info', 'STARTED')
    console.log(`CONNECTED TO DATABASE: ${db.dbPath}`)

    // 👉 запускаем отслеживание логов
    watchLogFile(mainWindow)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    watchLogFile(mainWindow)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()
  logger.setupIPC()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('window:minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win?.minimize()
})

ipcMain.on('window:maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win?.isMaximized() ? win.unmaximize() : win.maximize()
})

ipcMain.on('window:close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win?.close()
})

ipcMain.handle('get-log-file', () => {
  return getLogFileContent()
})
export { watchLogFile }

ipcMain.handle('logger:log', (_, message: string) => {
  logger.log('info', message)
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
