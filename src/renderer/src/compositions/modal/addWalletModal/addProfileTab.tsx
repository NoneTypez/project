import { Box, Button, IconButton, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import AutorenewIcon from '@mui/icons-material/Autorenew'

import { JSX, useState } from 'react'

export const fieldStyle = {
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

export default function AddProfileTab({ onClose }: { onClose: () => void }): JSX.Element {
  const [evmSeed, setEvmSeed] = useState('')
  const handleGenerate = async (typeOfWallet: string): Promise<void> => {
    const pair = await window.api.crypto.generateWallet('fromMnemonic')

    if (pair && pair.length > 0) {
      const wallet = pair[0]
      const phrase = wallet.phrase || wallet.mnemonic || '' // 👈 fallback
      if (phrase) setEvmSeed(phrase)
      else console.warn('Seed not found in generated wallet:', wallet)
    }
  }

  const handleAdd = (): void => {
    onClose()
  }

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '620px'
      }}
    >
      <Box>
        {/* Поля ввода */}
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
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
              value={evmSeed}
              onChange={(e) => setEvmSeed(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={() => handleGenerate('EVM')}>
                      <AutorenewIcon sx={generateButtonStyle} />
                    </IconButton>
                  )
                },
                inputLabel: {
                  shrink: !!evmSeed, // label поднимается если есть текст
                  sx: { fontSize: '0.75rem' } // маленький шрифт label
                }
              }}
              rows={4}
              label="EVM"
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
                    <IconButton onClick={() => handleGenerate('BTC')}>
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
                    <IconButton onClick={() => handleGenerate('SOL')}>
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
                    <IconButton onClick={() => handleGenerate('ATOM')}>
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
                    <IconButton onClick={() => handleGenerate('TON')}>
                      <AutorenewIcon sx={generateButtonStyle} />
                    </IconButton>
                  )
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Кнопки */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: 4
        }}
      >
        <Button variant="outlined" sx={{ width: 130 }} onClick={handleAdd}>
          ДОБАВИТЬ
        </Button>
        <Button variant="outlined" color="error" sx={{ width: 130 }} onClick={onClose}>
          ОТМЕНА
        </Button>
      </Box>
    </Box>
  )
}
