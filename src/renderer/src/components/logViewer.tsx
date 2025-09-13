import { JSX, useEffect, useRef, useState } from 'react'

export default function LogViewer(): JSX.Element {
  const [logContent, setLogContent] = useState<string[]>([])
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Загружаем лог при старте
    window.api.logger.getFile().then((content: string) => {
      setLogContent(content.split('\n'))
    })

    // Подписка на обновления
    window.api.logger.onUpdate((content: string) => {
      setLogContent(content.split('\n'))
    })
  }, [])

  useEffect(() => {
    // Автопрокрутка вниз при обновлении
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logContent])

  // Функция, которая возвращает цвет строки в зависимости от уровня лога
  const getColorForLog = (line: string): string => {
    if (line.includes('ERROR')) return '#ff4d4f' // красный
    if (line.includes('WARN')) return '#faad14' // оранжевый
    if (line.includes('INFO')) return '#6d6d6d' // серый
    return '#ffffff' // белый для остальных
  }

  return (
    <div
      ref={logRef}
      style={{
        height: '89vh',
        overflowY: 'auto',
        borderRadius: '8px',
        backgroundColor: '#2a272a'
      }}
    >
      {logContent.map((line, index) => (
        <pre
          key={index}
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            margin: 0,
            padding: 0,
            color: getColorForLog(line)
          }}
        >
          {line}
        </pre>
      ))}
    </div>
  )
}
