import { JSX, useState } from 'react'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Button
} from '@mui/material'
import TableHeaders from './tableHeaders'
import { testData } from '@renderer/models'
import cn from 'classnames'
import styles from '../table.module.css'

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

export default function Table(): JSX.Element {
  const [data, setData] = useState<IHeadersValues[]>(testData)
  const [selected, setSelected] = useState<number[]>([])

  const isAllChecked = selected.length === data.length

  // выбор всех
  const handleToggleAll = (): void => {
    if (isAllChecked) {
      setSelected([])
    } else {
      setSelected(data.map((row) => row.id))
    }
  }

  // выбор отдельной строки
  const handleToggleRow = (id: number): void => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  // сортировка
  const handleSort = (key: keyof IHeadersValues, asc: boolean): void => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[key] ?? ''
      const bValue = b[key] ?? ''

      if (aValue < bValue) return asc ? -1 : 1
      if (aValue > bValue) return asc ? 1 : -1
      return 0
    })
    setData(sorted)
  }

  return (
    <TableContainer
      component={Paper}
      className={cn(styles.main)}
      sx={{
        maxHeight: 'calc(100vh - 120px)', // динамически ограничиваем
        overflow: 'auto',
        background:
          'linear-gradient(to right, transparent 0%, #1a1a1a50 30%, #1a1a1a50 70%, transparent 100%)',
        '& .MuiTableCell-root': {
          color: '#929292ff',
          borderBottom: '1px solid #444'
        },
        '& .MuiTable-root': {
          tableLayout: 'fixed' // фиксированная ширина колонок
        },
        '& .MuiTableHead-root .MuiTableCell-root': {
          fontWeight: 'bold',
          backgroundColor: '#1a1a1abf' // чтобы фон заголовка был фиксирован, а не "прозрачный"
        },
        '& .MuiTableSortLabel-root .MuiTableSortLabel-icon': {
          color: '#aaa !important'
        },
        '& .MuiTableSortLabel-root.Mui-active': {
          color: '#929292ff !important'
        },
        '& .MuiTableSortLabel-root:hover': {
          color: '#929292ff !important'
        },
        '& .MuiTableSortLabel-root': {
          color: '#929292ff !important'
        }
      }}
    >
      <MuiTable stickyHeader>
        <TableHeaders
          isAllChecked={isAllChecked}
          onToggleAll={handleToggleAll}
          onSort={handleSort}
        />

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell padding="checkbox" align="center">
                <Checkbox
                  checked={selected.includes(row.id)}
                  onChange={() => handleToggleRow(row.id)}
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

              <TableCell>{row.id}</TableCell>
              <TableCell>{row.profileName}</TableCell>
              <TableCell>{row.balance}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.twitter}</TableCell>
              <TableCell align="center">{row.discord}</TableCell>
              <TableCell align="center">{row.telegram}</TableCell>
              <TableCell align="center">{row.telephone}</TableCell>
              <TableCell align="center">{row.github}</TableCell>
              <TableCell align="center" sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <Button variant="text" color="inherit" sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  ...
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}
