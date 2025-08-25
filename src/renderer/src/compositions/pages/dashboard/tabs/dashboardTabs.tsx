import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { JSX } from 'react'

import WalletTable from '../table/walletsTable/walletTable'
// import BtcTable from './BtcTable'
// import SolTable from './SolTable'
// import AtomTable from './AtomTable'

// Вспомогательный компонент для рендеринга содержимого вкладок
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}

export default function DashboardTabs(): JSX.Element {
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const tabStyle = {
    color: '#6d6d6dff',
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '17px',
    textTransform: 'none',
    '&.Mui-selected': {
      color: '#b3b5b6ff'
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent'
    }
  }

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        slotProps={{
          indicator: {
            sx: {
              height: '2px',
              bottom: '10px',
              borderRadius: '4px',
              backgroundColor: '#b3b5b6ff'
            }
          }
        }}
      >
        <Tab label="ПРОФИЛИ" sx={tabStyle} disableRipple />
        <Tab label="EVM" sx={tabStyle} disableRipple />
        <Tab label="BTC" sx={tabStyle} disableRipple />
        <Tab label="SOL" sx={tabStyle} disableRipple />
        <Tab label="ATOM" sx={tabStyle} disableRipple />
        <Tab label="TON" disabled sx={tabStyle} disableRipple />
      </Tabs>

      {/* Содержимое вкладок */}
      <TabPanel value={value} index={1}>
        <WalletTable />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <BtcTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SolTable />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AtomTable />
      </TabPanel> */}
    </Box>
  )
}
