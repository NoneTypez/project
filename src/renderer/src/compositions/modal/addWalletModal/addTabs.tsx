import { Box, Tab, Tabs } from '@mui/material'
import { JSX, useState } from 'react'
import AddProfileTab from './addProfileTab'
import AddWalletTab from './addWalletTab'
// import AddProfileMode from './addProfileTab'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      // {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 0,
            // height: 100
            width: 790,
            overflowY: 'auto'
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export function AddTabs(): JSX.Element {
  const [value, setValue] = useState(0)

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
          <Tab label="ПРОФИЛЬ" sx={tabStyle} disableRipple />
          <Tab label="КОШЕЛЕК" sx={tabStyle} disableRipple />
        </Tabs>

        {/* Содержимое вкладок */}
        <TabPanel value={value} index={0}>
          <AddProfileTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddWalletTab />
        </TabPanel>
      </Box>
    </Box>
  )
}
