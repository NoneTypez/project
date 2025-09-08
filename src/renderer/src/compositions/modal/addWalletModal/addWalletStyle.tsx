import { Box } from '@mui/material'
import { JSX } from 'react'
import { AddTabs } from './addTabs'

export default function AddWalletstyle(): JSX.Element {
  return (
    <Box
      sx={{
        height: '100vh', // или другая высота
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AddTabs />
    </Box>
  )
}
