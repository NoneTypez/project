import { JSX } from 'react'

import cn from 'classnames'
import styles from './dashboard.module.css'

import DashboardTabs from './tabs/dashboardTabs'

export default function DashboardPage(): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <DashboardTabs />
    </div>
  )
}
