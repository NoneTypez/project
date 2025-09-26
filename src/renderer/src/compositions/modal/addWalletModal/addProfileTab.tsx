import { Box, Button, IconButton, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import AutorenewIcon from '@mui/icons-material/Autorenew'

import { JSX } from 'react'

const fieldStyle = {
  '& .MuiInputLabel-root': {
    color: '#6d6d6dff', // цвет текста label
    '&.Mui-focused': {
      color: '#cdd2d5ff' // цвет label при фокусе
    }
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
    color: '#cdd2d5ff'
    // цвет текста внутри поля
  },
  padding: 0
}

const generateButtonStyle = {
  position: 'absolute',
  color: '#cdd2d5ff', // цвет иконки
  borderRadius: '10px',
  transition: 'all 0.3s ease', // плавность

  '&:hover': {
    backgroundColor: 'rgba(205, 210, 213, 0.15)', // легкая подсветка
    transform: 'scale(1.1)', // плавное увеличение
    boxShadow: '0 0 8px rgba(205, 210, 213, 0.4)' // лёгкое свечение
  },
  '&:active': {
    transform: 'scale(0.95)' // эффект нажатия
  }
}

export default function AddProfileTab(): JSX.Element {
  const handleGenerate = (): void => {
    // Тут генерируешь сид-фразу
    // например, console.log(`Generate seed for ${ticker}`)
    window.api.logger.warn('GENERATED A WALLET!!!')
  }
  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
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
        <Grid>
          <TextField
            fullWidth
            required
            multiline
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={() => handleGenerate('EVM')}>
                    <AutorenewIcon sx={generateButtonStyle} />
                  </IconButton>
                )
              }
            }}
            rows={4}
            label="evm"
            size="small"
            sx={{ ...fieldStyle, width: 300 }}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            multiline
            rows={4}
            required
            label="btc"
            size="small"
            sx={{ ...fieldStyle, width: 300 }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={() => handleGenerate('EVM')}>
                    <AutorenewIcon sx={generateButtonStyle} />
                  </IconButton>
                )
              }
            }}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="sol"
            size="small"
            sx={{ ...fieldStyle, width: 300 }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={() => handleGenerate('EVM')}>
                    <AutorenewIcon sx={generateButtonStyle} />
                  </IconButton>
                )
              }
            }}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            multiline
            rows={4}
            required
            label="atom"
            size="small"
            sx={{ ...fieldStyle, width: 300 }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={() => handleGenerate('EVM')}>
                    <AutorenewIcon sx={generateButtonStyle} />
                  </IconButton>
                )
              }
            }}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="ton"
            size="small"
            sx={{ ...fieldStyle, width: 300 }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={() => handleGenerate('EVM')}>
                    <AutorenewIcon sx={generateButtonStyle} />
                  </IconButton>
                )
              }
            }}
          />
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
