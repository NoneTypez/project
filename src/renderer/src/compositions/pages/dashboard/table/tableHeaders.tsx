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
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>

        {sortableHeaders.map((col) => (
          <TableCell key={col.key}>
            <TableSortLabel
              active={sortConfig?.key === col.key}
              direction={sortConfig?.key === col.key && !sortConfig.asc ? 'desc' : 'asc'}
              onClick={() => handleSort(col.key)}
            >
              {col.label}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell>EMAIL</TableCell>
        <TableCell>TWITTER</TableCell>
        <TableCell>DISCORD</TableCell>
        <TableCell>TELEGRAM</TableCell>
        <TableCell>TELEPHONE</TableCell>
        <TableCell>GITHUB</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  )
}

export default TableHeaders
