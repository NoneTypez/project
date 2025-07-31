import { JSX } from 'react'
import cn from 'classnames'
import styles from './sidebar.module.css'
import Logo from '@renderer/components/logo'
import logo from '@renderer/assets/logo.png'

import IconButton from '@mui/material/IconButton'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import HubIcon from '@mui/icons-material/Hub'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ChecklistIcon from '@mui/icons-material/Checklist'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import BlurCircularIcon from '@mui/icons-material/BlurCircular'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import SummarizeIcon from '@mui/icons-material/Summarize'

export default function SideBar(): JSX.Element {
  return (
    <div className={cn(styles.main)}>
      <div className={cn(styles.topblock)}>
        <Logo src={logo} />
        <IconButton className="btn">
          <SpaceDashboardIcon />
        </IconButton>
      </div>
      <div className={cn(styles.centerblock)}>
        <IconButton className="btn">
          <HubIcon />
        </IconButton>
        <IconButton className="btn">
          <CurrencyExchangeIcon />
        </IconButton>
        <IconButton className="btn">
          <ChecklistIcon />
        </IconButton>
        <IconButton className="btn">
          <SwapHorizIcon />
        </IconButton>
        <IconButton className="btn">
          <BlurCircularIcon />
        </IconButton>
        <IconButton className="btn">
          <BackupTableIcon />
        </IconButton>
      </div>
      <div className={cn(styles.bottomblock)}>
        <IconButton className="btn">
          <SummarizeIcon />
        </IconButton>
      </div>
    </div>
  )
}
