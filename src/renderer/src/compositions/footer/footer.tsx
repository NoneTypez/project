import { JSX } from 'react'
import cn from 'classnames'
import styles from './footer.module.css'
export default function Footer(): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <div className={cn(styles.leftZone)}>
        <span>TOTAL BALANCE: 10000$</span>
      </div>
      <div></div>
    </div>
  )
}
