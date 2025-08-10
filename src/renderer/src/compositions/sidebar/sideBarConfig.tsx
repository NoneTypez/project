// menuConfig.js
import HubIcon from '@mui/icons-material/Hub'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ChecklistIcon from '@mui/icons-material/Checklist'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import BlurCircularIcon from '@mui/icons-material/BlurCircular'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import SummarizeIcon from '@mui/icons-material/Summarize'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'

export const topMenu = [{ icon: <SpaceDashboardIcon />, label: 'Dashboard' }]

export const centerMenu = [
  {
    icon: <HubIcon />,
    label: 'Projects',
    subMenu: [
      { label: 'Option 1', onClick: () => console.log('Option 1') },
      { label: 'Option 2', onClick: () => console.log('Option 2') }
    ]
  },
  { icon: <CurrencyExchangeIcon />, label: 'Exchange' },
  { icon: <ChecklistIcon />, label: 'Scripts' },
  { icon: <SwapHorizIcon />, label: 'Swap' },
  { icon: <BlurCircularIcon />, label: 'Other' },
  { icon: <BackupTableIcon />, label: 'Table' }
]

export const bottomMenu = [{ icon: <SummarizeIcon />, label: 'Log' }]
