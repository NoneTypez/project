import { JSX, useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Grid } from '@mui/material'
interface AddProfileModeProps {
  onDataChange: (data: { [key: string]: string }[]) => void
  resetInputs: boolean
}

const initialData: { [key: string]: string }[] = [
  {
    name: '',
    email: '',
    twitter: '',
    discord: '',
    telegram: '',
    telephone: '',
    github: '',
    proxy: ''
  },
  {
    evm_privatekey: '',
    btc_privatekey: '',
    sol_privatekey: '',
    atom_privatekey: '',
    ton_privatekey: ''
  }
]

export default function AddProfileMode({
  onDataChange,
  resetInputs
}: AddProfileModeProps): JSX.Element {
  const [inputData, setInputData] = useState(initialData)
  const [evmAddress, setEvmAddress] = useState('')

  useEffect(() => {
    if (resetInputs) {
      setInputData(initialData)
    }
  }, [resetInputs])

  useEffect(() => {
    onDataChange(inputData)
  }, [inputData, onDataChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInputData((prevData) => {
      const index = Object.keys(prevData[0]).includes(name) ? 0 : 1
      return prevData.map((obj, i) => (i === index ? { ...obj, [name]: value } : obj))
    })
  }

  async function generateEvm(): Promise<void> {
    const result = await window.api.crypto.generateWallet('fromMnemonic')
    const address = result[0].address
    const privateKey = result[0].seed
    setEvmAddress(address)
    setInputData((prevData) => [prevData[0], { ...prevData[1], evm_privatekey: privateKey }])
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Личные данные */}
        <Grid>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={inputData[0].name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={inputData[0].email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="Twitter"
            name="twitter"
            value={inputData[0].twitter}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="Discord"
            name="discord"
            value={inputData[0].discord}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="Telegram"
            name="telegram"
            value={inputData[0].telegram}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="Phone"
            name="telephone"
            value={inputData[0].telephone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="GitHub"
            name="github"
            value={inputData[0].github}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="Proxy"
            name="proxy"
            value={inputData[0].proxy}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Кошельки */}
        <Grid>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Wallets
          </Typography>
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="EVM Private Key"
            name="evm_privatekey"
            value={inputData[1].evm_privatekey}
            onChange={handleInputChange}
          />
          <Typography variant="body2">Address: {evmAddress}</Typography>
          <Button variant="contained" size="small" onClick={generateEvm} sx={{ mt: 1 }}>
            Generate
          </Button>
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Solana Private Key"
            name="sol_privatekey"
            value={inputData[1].sol_privatekey}
            onChange={handleInputChange}
          />
          <Typography variant="body2">Address: —</Typography>
          <Button variant="contained" size="small" sx={{ mt: 1 }}>
            Generate
          </Button>
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="BTC Private Key"
            name="btc_privatekey"
            value={inputData[1].btc_privatekey}
            onChange={handleInputChange}
          />
          <Typography variant="body2">Address: —</Typography>
          <Button variant="contained" size="small" sx={{ mt: 1 }}>
            Generate
          </Button>
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="ATOM Private Key"
            name="atom_privatekey"
            value={inputData[1].atom_privatekey}
            onChange={handleInputChange}
          />
          <Typography variant="body2">Address: —</Typography>
          <Button variant="contained" size="small" sx={{ mt: 1 }}>
            Generate
          </Button>
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="TON Private Key"
            name="ton_privatekey"
            value={inputData[1].ton_privatekey}
            onChange={handleInputChange}
          />
          <Typography variant="body2">Address: —</Typography>
          <Button variant="contained" size="small" sx={{ mt: 1 }}>
            Generate
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
