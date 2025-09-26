import { JSX } from 'react'
import { Box } from '@mui/material'
import LogViewer from '@renderer/components/logViewer'

export default function LogWindow(): JSX.Element {
  return (
    <Box>
      <Box sx={{ padding: 1, margin: 0 }}>
        <LogViewer />
      </Box>
    </Box>
  )
}
