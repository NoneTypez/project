import { Box, Button, TextField } from '@mui/material'
import { JSX } from 'react'

export default function AddProfileTab(): JSX.Element {
  return (
    <Box>
      <Box sx={{ height: '70vh', margin: 2 }}>
        <TextField
          label="Имя"
          size="small"
          sx={{
            '& .MuiInputLabel-root': {
              color: '#dadcddff' // цвет текста label
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#dae2e6ff' // цвет рамки
              },
              '&:hover fieldset': {
                borderColor: '#105f8a' // цвет рамки при наведении
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0a3f5e' // цвет рамки при фокусе
              }
            },
            '& .MuiInputBase-input': {
              color: '#404040' // цвет текста внутри поля
            }
          }}
        />
      </Box>
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
