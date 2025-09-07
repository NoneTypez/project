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
        maxHeight: 'calc(100vh - 130px)', // динамически ограничиваем
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
