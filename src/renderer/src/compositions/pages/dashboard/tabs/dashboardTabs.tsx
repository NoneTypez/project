/* eslint-disable prettier/prettier */
import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { JSX } from 'react'

import WalletTable from '../table/walletsTable/walletTable'
import Table from '../table/profiles/table'
import EmptyPage from '../../emptyPage/emptyPage'
import { Button } from '@mui/material'
import ModalWindow from '@renderer/compositions/modal/modalWindow'
import AddWalletstyle from '@renderer/compositions/modal/addWalletModal/addWalletStyle'
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
      {value === index && (
        <Box
          sx={{
            p: 0,
            height: '100vh', // регулируй отступ от Tabs
            overflowY: 'auto'
          }}
        >
          {children}
        </Box>
      )}
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

  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          slotProps={{
            indicator: {
              sx: {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignContent: 'center',
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
          <Box sx={{ display: 'flex', height: '30px', alignSelf: 'center' }}>
            <Button
              variant="outlined"
              sx={{ borderColor: '#2088b8ff', color: '#2088b8ff' }}
              onClick={handleOpen} // просто открываем
            >
              ДОБАВИТЬ
            </Button>
            <ModalWindow open={open} onClose={handleClose}>
              <AddWalletstyle />
            </ModalWindow>
          </Box>
        </Tabs>

        {/* Содержимое вкладок */}
        <TabPanel value={value} index={0}>
          <Table />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WalletTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EmptyPage />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <EmptyPage />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <EmptyPage />
        </TabPanel>
      </Box>
    </Box>
  )
}
