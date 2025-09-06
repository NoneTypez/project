import { Box, Button } from '@mui/material'
import { JSX } from 'react'

export default function AddProfileTab(): JSX.Element {
  return (
    <Box>
      <Box></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // по горизонтали
          alignItems: 'center', // по вертикали
          gap: 10
        }}
      >
        <Button variant="outlined" sx={{ width: 130 }}>
          ДОБАВИТЬ
        </Button>
        <Button variant="outlined" color="error" sx={{ width: 130 }}>
          ОТМЕНА
        </Button>
      </Box>
    </Box>
  )
}
