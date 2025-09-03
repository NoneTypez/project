import { JSX } from 'react'
import cn from 'classnames'
import styles from './titleBar.module.css'

const isWindows = window.navigator.platform.includes('Win')

export default function TitleBar(): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <span className={styles.title}>Linx</span>

      {isWindows && (
        <div className={styles.buttons}>
          <button onClick={() => window.api.electronAPI.minimize()}>—</button>
          <button onClick={() => window.api.electronAPI.maximize()}>🗖</button>
          <button onClick={() => window.api.electronAPI.close()}>✕</button>
        </div>
      )}
    </div>
  )
}
