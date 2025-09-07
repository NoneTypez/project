import { JSX } from 'react'
import cn from 'classnames'
import styles from './window.module.css'
import { Box } from '@mui/material'

export interface IWindow {
  children?: JSX.Element
}

export default function Window({ children }: IWindow): JSX.Element {
  return <Box className={cn(styles.main)}>{children}</Box>
}
