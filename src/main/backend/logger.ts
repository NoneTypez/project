import { consola } from 'consola'
import { ipcMain, BrowserWindow, app } from 'electron'
import fs from 'fs'
import { join } from 'path'

class Logger {
  private mainWindow?: BrowserWindow | null = null
  private logFilePath: string

  constructor(mainWindow?: BrowserWindow) {
    this.mainWindow = mainWindow
    // Используем корневую директорию проекта
    this.logFilePath = join(app.getPath('userData'), 'app.log')
    console.log(this.logFilePath)

    // Создаём log-файл, если его нет
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, '', 'utf-8')
    }
  }

  log(level: 'info' | 'warn' | 'error' | 'success' | 'debug', message: string): void {
    const timestamp = new Date().toLocaleString('ru-RU', { hour12: false })
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`

    // Логируем в consola
    consola[level](message)

    // Записываем в файл
    fs.appendFileSync(this.logFilePath, logMessage, 'utf-8')

    // Отправляем лог на фронтенд
    this.mainWindow?.webContents.send('log-message', { level, message, timestamp })
  }

  setupIPC(): void {
    ipcMain.handle('log-info', (_, message) => this.log('info', message))
    ipcMain.handle('log-warn', (_, message) => this.log('warn', message))
    ipcMain.handle('log-error', (_, message) => this.log('error', message))
    ipcMain.handle('log-success', (_, message) => this.log('success', message))
  }
}
const logger = new Logger()

export default logger
