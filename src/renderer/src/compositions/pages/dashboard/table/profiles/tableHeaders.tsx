import { JSX, useState } from 'react'
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from '@mui/material'

interface IHeadersValues {
  id: number
  profileName: string
  email: string
  twitter: string
  discord: string
  telegram: string
  telephone: string
  github: string
  balance?: string | undefined
}

interface ITableHeaders {
  isAllChecked: boolean
  onToggleAll: () => void
  onSort: (key: keyof IHeadersValues, ascending: boolean) => void
}

function TableHeaders({ isAllChecked, onToggleAll, onSort }: ITableHeaders): JSX.Element {
  const [sortConfig, setSortConfig] = useState<{ key: keyof IHeadersValues; asc: boolean } | null>(
    null
  )

  const handleSort = (key: keyof IHeadersValues): void => {
    const isAsc = sortConfig?.key === key ? !sortConfig.asc : true
    setSortConfig({ key, asc: isAsc })
    onSort(key, isAsc)
  }

  const sortableHeaders: { label: string; key: keyof IHeadersValues }[] = [
    { label: '#', key: 'id' },
    { label: 'NAME', key: 'profileName' },
    { label: 'BALANCE', key: 'balance' }
  ]

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isAllChecked}
            onChange={onToggleAll}
            slotProps={{
              input: {
                'aria-label': 'select all'
              }
            }}
            sx={{
              color: '#404040ff', // цвет галочки по умолчанию
              '&.Mui-checked': {
                color: '#2088b8ff' // цвет галочки, когда включен
              },
              transition: 'all 0.3s ease',
              '& .MuiSvgIcon-root': {
                transition: 'all 0.3s ease'
              }
            }}
          />
        </TableCell>

        {sortableHeaders.map((col) => (
          <TableCell key={col.key} padding="none" align="center">
            <TableSortLabel
              active={sortConfig?.key === col.key}
              direction={sortConfig?.key === col.key && !sortConfig.asc ? 'desc' : 'asc'}
              onClick={() => handleSort(col.key)}
              sx={{
                display: 'flex',
                paddingLeft: '15px'
              }}
            >
              {col.label}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell padding="none" align="center">
          EMAIL
        </TableCell>
        <TableCell padding="none" align="center">
          TWITTER
        </TableCell>
        <TableCell padding="none" align="center">
          DISCORD
        </TableCell>
        <TableCell padding="none" align="center">
          TELEGRAM
        </TableCell>
        <TableCell padding="none" align="center">
          TELEPHONE
        </TableCell>
        <TableCell padding="none" align="center">
          GITHUB
        </TableCell>
        <TableCell padding="none" align="center" />
      </TableRow>
    </TableHead>
  )
}

export default TableHeaders
