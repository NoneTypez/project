import { useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress
} from '@mui/material'
import { fieldStyle } from './addProfileTab'

export default function AddWalletTab({ onClose }: { onClose: () => void }) {
  const [multiple, setMultiple] = useState(false)
  const [count, setCount] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const [walletType, setWalletType] = useState('EVM')
  const [countError, setCountError] = useState(false)
  const [address, setAddress] = useState('')
  const [loadingAddress, setLoadingAddress] = useState(false)
  const [wallet, setWallet] = useState({ phrase: '', privateKey: '', address: '' })

  const handleAdd = () => {
    window.api.db.insertWalletData('evm_wallets', [
      { phrase: wallet.phrase, privateKey: wallet.privateKey, address: wallet.address }
    ])

    onClose()
  }

  const handleMnemonicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setMnemonic(value)

    if (!value) {
      setAddress('')
      return
    }

    setLoadingAddress(true)

    try {
      // Получаем кошелёк (ошибка внутри = invalid mnemonic)
      const wallet = await window.api.crypto.getWalletFromMnemonic(value)

      // Если успех — заполняем
      setWallet(wallet)
      setAddress(wallet.address)
    } catch (err) {
      // Любая ошибка — считаем мнемонику неверной
      console.warn('Invalid mnemonic:', err)
      setAddress('')
    } finally {
      setLoadingAddress(false)
    }
  }

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCount(value)

    // Проверяем, что строка состоит только из цифр и не пустая
    const isValid = /^[0-9]+$/.test(value)
    setCountError(!isValid)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '660px',
        p: 3
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Выбор типа кошелька */}
        <RadioGroup
          row
          value={walletType}
          onChange={(e) => setWalletType(e.target.value)}
          sx={{
            '& .MuiSvgIcon-root': {
              color: '#1976d2' // цвет контура кружка
            },
            '&.Mui-checked .MuiSvgIcon-root': {
              color: '#1976d2' // цвет заполненного кружка
            }
          }}
        >
          <FormControlLabel
            value="EVM"
            control={<Radio />}
            sx={{ color: '#6d6d6dff' }}
            label="EVM"
          />
          <FormControlLabel
            value="BTC"
            control={<Radio />}
            sx={{ color: '#6d6d6dff' }}
            label="BTC"
          />
          <FormControlLabel
            value="SOL"
            control={<Radio />}
            sx={{ color: '#6d6d6dff' }}
            label="SOL"
          />
          <FormControlLabel
            value="ATOM"
            control={<Radio />}
            sx={{ color: '#6d6d6dff' }}
            label="ATOM"
          />
          <FormControlLabel
            value="TON"
            control={<Radio />}
            sx={{ color: '#6d6d6dff' }}
            label="TON"
          />
        </RadioGroup>

        {/* Чекбокс "multiple" */}
        <FormControlLabel
          control={
            <Checkbox
              checked={multiple}
              onChange={(e) => setMultiple(e.target.checked)}
              sx={{
                '& .MuiSvgIcon-root': {
                  color: '#6d6d6dff' // цвет рамки чекбокса
                },
                '&.Mui-checked .MuiSvgIcon-root': {
                  color: '#1976d2' // цвет при активном состоянии
                },
                '&:hover .MuiSvgIcon-root': {
                  color: '#a9aeb0ff' // цвет рамки при наведении
                }
              }}
            />
          }
          label="Multiple wallet generator"
          sx={{
            mb: 2,
            color: '#6d6d6dff' // цвет текста подписи
          }}
        />

        {/* Поля */}
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%', maxWidth: 700, mb: 4 }}
        >
          {multiple ? (
            <Grid size={12}>
              <TextField
                fullWidth
                size="small"
                label="Количество кошельков"
                value={count}
                onChange={handleCountChange}
                sx={{ ...fieldStyle }}
                error={countError}
                helperText={countError ? 'Введите только число (например: 5)' : ''}
              />
            </Grid>
          ) : (
            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                size="small"
                label="Мнемоническая фраза"
                value={mnemonic}
                onChange={handleMnemonicChange}
                sx={{ ...fieldStyle }}
                error={mnemonic.length === 0}
              />

              {/* Спиннер пока загружается */}
              {loadingAddress && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                  <CircularProgress size={'20px'} />
                </Box>
              )}

              {/* Адрес после загрузки */}
              {!loadingAddress && address && (
                <Box
                  sx={{
                    mt: 2,
                    color: '#cdd2d5ff',
                    fontSize: '0.8rem',
                    wordBreak: 'break-all'
                  }}
                >
                  Адрес: {address}
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Кнопки */}
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: 4 }}>
        <Button
          variant="outlined"
          sx={{ width: 130 }}
          onClick={handleAdd}
          disabled={(multiple && (countError || !count)) || !address} // ✅ блокировка кнопки при ошибке
        >
          ДОБАВИТЬ
        </Button>
        <Button variant="outlined" color="error" sx={{ width: 130 }} onClick={onClose}>
          ОТМЕНА
        </Button>
      </Box>
    </Box>
  )
}
