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
  const mainIconStyle = {
    fontSize: 40,
    color: '#515151ff',
    cursor: 'default',
    '&:hover': {
      color: '#bcbcbeff'
    }
  }
  const iconButtonStyle = {
    padding: '6px 0',
    cursor: 'default'
  }

  return (
    <div className={cn(styles.main)}>
      <div className={cn(styles.topblock)}>
        <Logo src={logo} />
        <IconButton sx={iconButtonStyle}>
          <SpaceDashboardIcon sx={mainIconStyle} />
        </IconButton>
      </div>
      <div className={cn(styles.centerblock)}>
        <IconButton sx={iconButtonStyle}>
          <HubIcon sx={mainIconStyle} />
        </IconButton>
        <IconButton sx={iconButtonStyle}>
          <CurrencyExchangeIcon sx={mainIconStyle} />
        </IconButton>
        <IconButton sx={iconButtonStyle}>
          <ChecklistIcon sx={mainIconStyle} />
        </IconButton>
        <IconButton sx={iconButtonStyle}>
          <SwapHorizIcon sx={mainIconStyle} />
        </IconButton>
        <IconButton sx={iconButtonStyle}>
          <BlurCircularIcon sx={mainIconStyle} />
        </IconButton>
        <IconButton sx={iconButtonStyle}>
          <BackupTableIcon sx={mainIconStyle} />
        </IconButton>
      </div>
      <div className={cn(styles.bottomblock)}>
        <IconButton sx={iconButtonStyle}>
          <SummarizeIcon sx={mainIconStyle} />
        </IconButton>
      </div>
    </div>
  )
}
