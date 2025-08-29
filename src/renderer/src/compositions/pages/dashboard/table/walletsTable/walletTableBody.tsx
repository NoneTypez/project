import { JSX } from 'react'
import { TableBody, TableRow, TableCell, Checkbox, Button } from '@mui/material'

interface Wallet {
  id: number
  address: string
  balance: string
}

interface WalletTableBodyProps {
  data: Wallet[]
  checkedItems: Record<number, boolean>
  onToggleItem: (id: number) => void
}

function WalletTableBody({ data, checkedItems, onToggleItem }: WalletTableBodyProps): JSX.Element {
  return (
    <TableBody>
      {data.map(({ id, address, balance }) => (
        <TableRow key={id} hover>
          <TableCell padding="checkbox" sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <Checkbox
              checked={checkedItems[id] || false}
              onChange={() => onToggleItem(id)}
              sx={{
                color: '#404040ff',
                '&.Mui-checked': { color: '#2088b8ff' },
                transition: 'all 0.3s ease'
              }}
            />
          </TableCell>

          <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }}>{id}</TableCell>
          <TableCell align="center" sx={{ paddingTop: 0, paddingBottom: 0 }}>
            {address}
          </TableCell>
          <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }}>{balance}$</TableCell>
          <TableCell align="center" sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <Button variant="text" color="inherit" sx={{ paddingTop: 0, paddingBottom: 0 }}>
              ...
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default WalletTableBody
