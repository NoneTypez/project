import { app } from 'electron'
import Database from 'better-sqlite3'
import { decrypt, encrypt } from './crypt'
import path from 'path'
import { IProfile, IWallet, stmtsForInsert, TABLES } from './db_types'
import { createTableQueries } from './tables'
// import logger from '../Logger';
import {
  createEmvDataToInsert,
  createSolDataToInsert,
  createAtomDataToInsert,
  createBtcDataToInsert,
  createTonDataToInsert
} from '../web3Scripts/utils'
import logger from '../logger'

class DB {
  dbPath: string
  db: Database.Database | null = null

  constructor() {
    this.dbPath = ''
    app.whenReady().then(() => {
      this.dbPath = path.join(app.getPath('userData'), 'DATABASE.db')
      this.db = new Database(this.dbPath)
      this.createTables()
      logger.log('info', 'CREATE A DATABASE')
    })
  }

  private createTables(): void {
    if (!this.db) return
    createTableQueries.forEach((data) => this.db?.prepare(data).run())
  }

  async __DROPTABLES(): Promise<void> {
    if (!this.db) return

    const queries = Object.values(TABLES).map((table) => `DROP TABLE IF EXISTS ${table}`)

    const transaction = this.db.transaction(() => {
      for (const query of queries) {
        const stmt = this.db?.prepare(query)
        stmt?.run()
      }
    })

    try {
      transaction()
      console.log('✅ Все таблицы удалены')
    } catch (error) {
      console.error('❌ Ошибка при удалении таблиц:', error)
    }
  }

  async selectData(from: TABLES | '*'): Promise<{
    profiles?: IProfile[]
    projects?: unknown[]
    fees?: unknown[]
    earnings?: unknown[]
    evm_wallets?: IWallet[]
    sol_wallets?: IWallet[]
    btc_wallets?: IWallet[]
    atom_wallets?: IWallet[]
    ton_wallets?: IWallet[]
  }> {
    if (!this.db) throw new Error('Database connection is not initialized')

    // Результат, который будет возвращён
    const result: { [key: string]: Record<string, string>[] } = {}

    const tables: TABLES[] = [
      TABLES.profiles,
      TABLES.projects,
      TABLES.fees,
      TABLES.earnings,
      TABLES.evm_wallets,
      TABLES.sol_wallets,
      TABLES.btc_wallets,
      TABLES.atom_wallets,
      TABLES.ton_wallets
    ]

    // Если 'from' равен all_tables, то получаем все таблицы, иначе только одну
    const tablesToQuery = from === '*' ? tables : [from]

    try {
      // Открываем транзакцию
      this.db.transaction(() => {
        // Проходим по всем таблицам и получаем их данные
        tablesToQuery.forEach((table) => {
          const query = `SELECT * FROM ${table}`
          const rows = this.db?.prepare(query).all() as Record<string, string>[]

          // Для каждой таблицы добавляем её данные в объект result
          result[table] = rows.map((row) => {
            const decryptedRow: { [key: string]: string } = {}

            // Проходим по каждому значению и расшифровываем, если нужно
            for (const key in row) {
              if (row[key] && typeof row[key] === 'string' && row[key].startsWith('ENC:')) {
                decryptedRow[key] = decrypt(row[key].substring(4)) // Убираем "ENC:" и расшифровываем
              } else {
                decryptedRow[key] = row[key] // Оставляем значение без изменений
              }
            }

            return decryptedRow
          })
        })
      })()

      // Выводим результат
      console.log('✅ Данные успешно получены:')
      return result
    } catch (error) {
      console.error('❌ Ошибка при получении данных:', error)
      return {}
    }
  }

  async insertProfileData(inputData: IProfile): Promise<void> {
    if (!this.db) throw new Error('Database connection is not initialized')

    const evmData = createEmvDataToInsert(inputData.evm_seed)
    const solData = createSolDataToInsert(inputData.sol_seed)
    const btcData = createBtcDataToInsert(inputData.btc_seed)
    const atomData = createAtomDataToInsert(inputData.atom_seed)
    const tonData = createTonDataToInsert(inputData.ton_seed)

    const mergedData = {
      ...inputData,
      ...evmData,
      ...solData,
      ...btcData,
      ...atomData,
      ...tonData
    }

    try {
      this.db.transaction(() => {
        this.db?.prepare(stmtsForInsert.inProfileTable).run(mergedData)
        this.db?.prepare(stmtsForInsert.inEvmWalletTable).run(mergedData)
        this.db?.prepare(stmtsForInsert.inSolWalletTable).run(mergedData)
        this.db?.prepare(stmtsForInsert.inBtcWalletTable).run(mergedData)
        this.db?.prepare(stmtsForInsert.inAtomWalletTable).run(mergedData)
        this.db?.prepare(stmtsForInsert.inTonWalletTable).run(mergedData)
      })()

      console.log('✅ Данные успешно вставлены')
    } catch (error) {
      console.error('❌ Ошибка при вставке данных:', error)
    }
  }

  async insertWalletData(tableName: TABLES, inputData: IWallet[]): Promise<void> {
    if (!this.db) throw new Error('Database connection is not initialized')

    const query = this.db.prepare(
      `INSERT INTO ${tableName} (seed, privatekey, address) VALUES (@seed, @privatekey, @address)`
    )

    try {
      this.db.transaction(() => {
        for (const walletData of inputData) {
          query.run({
            seed: `ENC:${encrypt(walletData.seed)}`,
            privatekey: `ENC:${encrypt(walletData.privatekey)}`,
            address: `ENC:${encrypt(walletData.address)}`
          })
        }
      })()
      console.log(`✅ Данные успешно вставлены в ${tableName}`)
    } catch (error) {
      console.error(`❌ Ошибка при вставке данных в ${tableName}:`, error)
    }
  }

  async update(
    inTable: TABLES,
    id: number,
    updateData: Partial<IProfile | IWallet>
  ): Promise<void> {
    if (!this.db) throw new Error('Database connection is not initialized')

    // Генерация строки SET для обновления
    const setClauses = Object.keys(updateData)
      .map((key) => `${key} = @${key}`)
      .join(', ')

    // Подготовка SQL запроса
    const query = `UPDATE ${inTable} SET ${setClauses} WHERE id = @id`

    const stmt = this.db.prepare(query)

    try {
      // Запуск транзакции
      this.db.transaction(() => {
        stmt.run({ ...updateData, id })
      })()
      console.log('✅ Данные успешно обновлены')
    } catch (error) {
      console.error('❌ Ошибка при обновлении данных:', error)
    }
  }
}

export const db = new DB()
