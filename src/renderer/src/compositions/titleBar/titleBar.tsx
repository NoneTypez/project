import { JSX } from 'react'
import cn from 'classnames'
import styles from './titleBar.module.css'
import { Box } from '@mui/material'

const isWindows = window.navigator.platform.includes('Win')

export default function TitleBar(): JSX.Element {
  return (
    <Box className={cn(styles.main)}>
      <span className={styles.title}>Linx</span>

      {isWindows && (
        <Box className={styles.buttons}>
          <button onClick={() => window.api.titleBar.minimize()}>—</button>
          <button onClick={() => window.api.titleBar.maximize()}>🗖</button>
          <button onClick={() => window.api.titleBar.close()}>✕</button>
        </Box>
      )}
    </Box>
  )
}
