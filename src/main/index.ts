import { app, shell, BrowserWindow } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { db } from './backend/db/dbEngine'
import fs from 'fs'
import { registerIPCHandlers } from './ipcHandlers'

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
function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    minHeight: 800,
    minWidth: 1200,
    width: 1200,
    height: 800,
    resizable: true,
    frame: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  console.log(`Connected to DB on ${db.dbPath}`)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    watchLogFile(mainWindow)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const mainWindow = createWindow()
  registerIPCHandlers(mainWindow)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
