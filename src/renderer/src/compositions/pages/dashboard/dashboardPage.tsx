import { JSX } from 'react'

import cn from 'classnames'
import styles from './dashboard.module.css'

import DashboardTabs from './tabs/dashboardTabs'
import MainTable from './table/profiles/table'

interface IDashboardProps {
  data?: []
}

export default function DashboardPage({ data }: IDashboardProps): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <DashboardTabs />
      <MainTable />
    </div>
  )
}
