import { JSX, useState } from 'react'
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from '@mui/material'

interface WalletHeadersProps {
  isAllChecked: boolean
  onToggleAll: () => void
  onSort: (key: 'id' | 'balance', asc: boolean) => void
}

function WalletTableHeaders({
  isAllChecked,
  onToggleAll,
  onSort
}: WalletHeadersProps): JSX.Element {
  const [sortConfig, setSortConfig] = useState<{ key: 'id' | 'balance'; asc: boolean } | null>(null)

  const handleSort = (key: 'id' | 'balance'): void => {
    const isAsc = sortConfig?.key === key ? !sortConfig.asc : true
    setSortConfig({ key, asc: isAsc })
    onSort(key, isAsc)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isAllChecked}
            onChange={onToggleAll}
            sx={{
              color: '#404040ff',
              '&.Mui-checked': { color: '#2088b8ff' },
              transition: 'all 0.3s ease',
              '& .MuiSvgIcon-root': { transition: 'all 0.3s ease' }
            }}
          />
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={sortConfig?.key === 'id'}
            direction={sortConfig?.key === 'id' && !sortConfig.asc ? 'desc' : 'asc'}
            onClick={() => handleSort('id')}
          >
            #
          </TableSortLabel>
        </TableCell>

        <TableCell align="center">ADDRESS</TableCell>

        <TableCell>
          <TableSortLabel
            active={sortConfig?.key === 'balance'}
            direction={sortConfig?.key === 'balance' && !sortConfig.asc ? 'desc' : 'asc'}
            onClick={() => handleSort('balance')}
          >
            BALANCE
          </TableSortLabel>
        </TableCell>

        <TableCell align="center"></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default WalletTableHeaders
