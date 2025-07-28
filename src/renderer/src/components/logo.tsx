import cn from 'classnames'
import styles from './Logo.module.css'
import { JSX } from 'react'

function Logo(src: string): JSX.Element {
  return (
    <span>
      <img className={cn(styles.logo)} src={src} alt="Logo" />
    </span>
  )
}

export default Logo
