import { Box } from '@mui/material'
import { JSX } from 'react'
import { AddTabs } from './addTabs'

export default function AddWalletstyle(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AddTabs />
    </Box>
  )
}
