import { JSX } from 'react'
import cn from 'classnames'
import styles from './sidebar.module.css'

export default function SideBar(): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <div className={cn(styles.topblock)}></div>
      <div className={cn(styles.centerblock)}></div>
      <div className={cn(styles.bottomblock)}></div>
    </div>
  )
}
