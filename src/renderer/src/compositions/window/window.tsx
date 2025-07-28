import { JSX } from 'react'
import cn from 'classnames'
import styles from './window.module.css'

export default function Window(): JSX.Element {
  return <div className={cn(styles.main)}></div>
}
