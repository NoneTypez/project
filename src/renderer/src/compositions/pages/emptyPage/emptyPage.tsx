import cn from 'classnames'
import styles from './emptyPage.module.css'
import { JSX } from 'react'

interface EmptyPageProps {
  text?: string
}

export default function EmptyPage({
  text = 'There is nothing here yet ...'
}: EmptyPageProps): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <span>
        <h4>{text}</h4>
      </span>
    </div>
  )
}
