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

import { useLocation, useNavigate } from 'react-router-dom'

import SideBarButton from './sideBarButton'
import { SubMenuConfig } from './sideBarConfig'
import { Box } from '@mui/material'

export default function SideBar(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  const isDashboardActive = location.pathname === '/'

  const isSubMenuActive = (subMenu?: { path: string }[]): boolean =>
    subMenu ? subMenu.some((item) => location.pathname.startsWith(item.path)) : false

  return (
    <Box className={cn(styles.main)}>
      <Box className={cn(styles.topblock)}>
        <Logo src={logo} />
        <SideBarButton
          icon={SpaceDashboardIcon}
          onClick={() => navigate('/')}
          active={isDashboardActive}
        />
      </Box>
      <Box className={cn(styles.centerblock)}>
        <SideBarButton
          icon={HubIcon}
          subMenu={SubMenuConfig.projects}
          active={isSubMenuActive(SubMenuConfig.projects)}
        />
        <SideBarButton
          icon={CurrencyExchangeIcon}
          subMenu={SubMenuConfig.exchange}
          active={isSubMenuActive(SubMenuConfig.exchange)}
        />
        <SideBarButton
          icon={ChecklistIcon}
          subMenu={SubMenuConfig.script}
          active={isSubMenuActive(SubMenuConfig.script)}
        />
        <SideBarButton
          icon={SwapHorizIcon}
          subMenu={SubMenuConfig.swap}
          active={isSubMenuActive(SubMenuConfig.swap)}
        />
        <SideBarButton
          icon={BlurCircularIcon}
          active={location.pathname.startsWith('/other')}
          onClick={() => navigate('/other')}
        />
        <SideBarButton
          icon={BackupTableIcon}
          active={location.pathname.startsWith('/table')}
          onClick={() => navigate('/table')}
        />
      </Box>
      <Box className={cn(styles.bottomblock)}>
        <SideBarButton
          icon={SummarizeIcon}
          active={location.pathname.startsWith('/log')}
          onClick={() => navigate('/log')}
        />
      </Box>
    </Box>
  )
}
