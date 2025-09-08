import { Box, Button, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'

import { JSX } from 'react'

const fieldStyle = {
  '& .MuiInputLabel-root': {
    color: '#cdd2d5ff' // цвет текста label
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4f4f4fff' // цвет рамки
    },
    '&:hover fieldset': {
      borderColor: '#cdd2d5ff' // цвет рамки при наведении
    },
    '&.Mui-focused fieldset': {
      borderColor: '#cdd2d5ff' // цвет рамки при фокусе
    }
  },
  '& .MuiInputBase-input': {
    color: '#b5b3b3ff' // цвет текста внутри поля
  }
}

export default function AddWalletTab(): JSX.Element {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Поля ввода */}
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid>
          <TextField required label="имя" size="small" sx={{ ...fieldStyle }} />
        </Grid>
        <Grid>
          <TextField
            required
            fullWidth
            label="email"
            size="small"
            sx={{ ...fieldStyle, width: 400 }}
          />
        </Grid>
        <Grid>
          <TextField required label="twitter" size="small" sx={fieldStyle} />
        </Grid>
        <Grid>
          <TextField required fullWidth label="discord" size="small" sx={fieldStyle} />
        </Grid>
        <Grid>
          <TextField required fullWidth label="телефон" size="small" sx={fieldStyle} />
        </Grid>
        <Grid>
          <TextField required fullWidth label="telegram" size="small" sx={fieldStyle} />
        </Grid>
        <Grid>
          <TextField required fullWidth label="github" size="small" sx={fieldStyle} />
        </Grid>
        <Grid>
          <TextField required fullWidth label="proxy" size="small" sx={fieldStyle} />
        </Grid>
      </Grid>

      {/* Кнопки */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          mt: 4
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
