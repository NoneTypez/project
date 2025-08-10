import { JSX } from 'react'
import cn from 'classnames'
import styles from './sidebar.module.css'
import Logo from '@renderer/components/logo'
import logo from '@renderer/assets/logo.png'

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import HubIcon from '@mui/icons-material/Hub'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ChecklistIcon from '@mui/icons-material/Checklist'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import BlurCircularIcon from '@mui/icons-material/BlurCircular'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import SummarizeIcon from '@mui/icons-material/Summarize'

import SideBarButton from './sideBarButton'
export default function SideBar(): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <div className={cn(styles.topblock)}>
        <Logo src={logo} />
        <SideBarButton icon={SpaceDashboardIcon} />
      </div>
      <div className={cn(styles.centerblock)}>
        <SideBarButton icon={HubIcon} />
        <SideBarButton icon={CurrencyExchangeIcon} />
        <SideBarButton icon={ChecklistIcon} />
        <SideBarButton icon={SwapHorizIcon} />
        <SideBarButton icon={BlurCircularIcon} />
        <SideBarButton icon={BackupTableIcon} />
      </div>
      <div className={cn(styles.bottomblock)}>
        <SideBarButton icon={SummarizeIcon} />
      </div>
    </div>
  )
}
