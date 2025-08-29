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
        maxHeight: '685px',
        overflow: 'auto',
        backgroundColor: '#00000025',
        '& .MuiTableCell-root': {
          color: '#929292ff',
          borderBottom: '1px solid #444'
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
