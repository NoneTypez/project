import { JSX } from 'react'

import cn from 'classnames'
import styles from './dashboard.module.css'

import DashboardTabs from './tabs/dashboardTabs'
import { Box } from '@mui/material'

export default function DashboardPage(): JSX.Element {
  return (
    <Box className={cn(styles.main)}>
      <DashboardTabs />
    </Box>
  )
}
