/* eslint-disable prettier/prettier */
import { JSX, useState } from 'react'
import { Table, TableContainer, Paper } from '@mui/material'
import { EVMWalletsData } from '@renderer/models'
import WalletTableHeaders from './walletTableHeaders'
import WalletTableBody from './walletTableBody'

function WalletTable(): JSX.Element {
  const [wallets, setWallets] = useState(EVMWalletsData)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const isAllChecked = wallets.length > 0 && wallets.every((w) => checkedItems[w.id])

  const handleToggleAll = (): void => {
    if (isAllChecked) {
      setCheckedItems({})
    } else {
      const allChecked: Record<number, boolean> = {}
      wallets.forEach((w) => {
        allChecked[w.id] = true
      })
      setCheckedItems(allChecked)
    }
  }

  const handleToggleItem = (id: number): void => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleSort = (key: 'id' | 'balance', asc: boolean): void => {
    const sorted = [...wallets].sort((a, b) => {
      const aVal = key === 'balance' ? Number(a[key]) : a[key]
      const bVal = key === 'balance' ? Number(b[key]) : b[key]
      if (aVal < bVal) return asc ? -1 : 1
      if (aVal > bVal) return asc ? 1 : -1
      return 0
    })
    setWallets(sorted)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '683px',
        overflow: 'auto',
        background:
          'linear-gradient(to right, transparent 0%, #1a1a1a50 30%, #1a1a1a50 70%, transparent 100%)',

        '& .MuiTableCell-root': {
          color: '#929292ff',
          borderBottom: '1px solid #444'
        },
        '& .MuiTableHead-root .MuiTableCell-root': {
          fontWeight: 'bold',
          background:
            'linear-gradient(90deg,rgba(26, 26, 26, 0.69) 0%, rgba(26, 26, 26, 0.87) 50%, rgba(26, 26, 26, 0.68) 100%);' // чтобы фон заголовка был фиксирован, а не "прозрачный"
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
        },
        /* Стили для кастомного скроллбара */
        '&::-webkit-scrollbar': {
          width: '12px', // Ширина вертикального скроллбара
          height: '12px' // Высота горизонтального скроллбара
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#2c2c2c', // Цвет фона области скроллбара
          borderRadius: '10px' // Скругление углов области скроллбара
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#1885b7ff', // Цвет ползунка
          borderRadius: '10px',
          border: '3px solid #1a1a1a' // Граница вокруг ползунка
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#42a4c5ff' // Цвет ползунка при наведении
        }
      }}
    >
      <Table stickyHeader>
        <WalletTableHeaders
          isAllChecked={isAllChecked}
          onToggleAll={handleToggleAll}
          onSort={handleSort}
        />
        <WalletTableBody
          data={wallets}
          checkedItems={checkedItems}
          onToggleItem={handleToggleItem}
        />
      </Table>
    </TableContainer>
  )
}

export default WalletTable
