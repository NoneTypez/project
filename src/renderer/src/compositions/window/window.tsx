import { JSX } from 'react'
import cn from 'classnames'
import styles from './window.module.css'

export interface IWindow {
  children?: JSX.Element
}

export default function Window({ children }: IWindow): JSX.Element {
  return <div className={cn(styles.main)}>{children}</div>
}
