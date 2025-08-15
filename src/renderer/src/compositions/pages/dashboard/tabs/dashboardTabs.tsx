import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { JSX } from 'react'

export default function DashboardTabs(): JSX.Element {
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const tabStyle = {
    color: '#6d6d6dff', // цвет по умолчанию
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '17px',
    textTransform: 'none', // чтобы не было caps
    '&.Mui-selected': {
      color: '#b3b5b6ff' // цвет при выборе
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent' // убираем голубую анимацию
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
              height: '2px', // толщина полоски
              bottom: '10px', // поднимаем выше
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
    </Box>
  )
}
