import { Box } from '@mui/material'
import { JSX } from 'react'
import { AddWalletsTabs } from './addWalletTabs'

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
      <AddWalletsTabs />
    </Box>
  )
}
