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
    <TableBody sx={{ '& .MuiTableRow-root': { height: 5 } }}>
      {data.map(({ id, address, balance }) => (
        <TableRow key={id} hover>
          <TableCell padding="checkbox">
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

          <TableCell>{id}</TableCell>
          <TableCell align="center">{address}</TableCell>
          <TableCell>{balance}$</TableCell>
          <TableCell align="center" sx={{ py: 0 }}>
            <Button variant="text" color="inherit">
              ...
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default WalletTableBody
