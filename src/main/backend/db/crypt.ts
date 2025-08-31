import * as crypto from 'crypto'
import * as dotenv from 'dotenv'

dotenv.config()

export function encrypt(text: string, secret: string = process.env.SECRET || ''): string {
  if (!secret) {
    throw new Error('Secret key is missing')
  }

  const algorithm = 'aes-256-cbc'
  const key = crypto.scryptSync(secret, 'salt', 32) // Генерация ключа из пароля
  const iv = crypto.randomBytes(16) // Генерация случайного IV

  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return iv.toString('hex') + encrypted // IV нужен для расшифровки
}

export function decrypt(encryptedText: string, secret: string = process.env.SECRET || ''): string {
  if (!secret) {
    throw new Error('Secret key is missing')
  }

  const algorithm = 'aes-256-cbc'
  const key = crypto.scryptSync(secret, 'salt', 32)

  const iv = Buffer.from(encryptedText.slice(0, 32), 'hex') // Первые 16 байт — IV
  const encrypted = encryptedText.slice(32) // Оставшаяся часть — зашифрованные данные

  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

// **Пример использования**
// const encryptedData = encrypt('Hello, world!');
// console.log('Encrypted:', encryptedData);

// const decryptedData = decrypt(encryptedData);
// console.log('Decrypted:', decryptedData);
