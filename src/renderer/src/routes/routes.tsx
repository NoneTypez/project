import { Routes, Route } from 'react-router-dom'
import EmptyPage from '@renderer/compositions/pages/emptyPage/emptyPage'
import { JSX } from 'react'

import DashboardPage from '@renderer/compositions/pages/dashboard/dashboardPage'
import LogWindow from '@renderer/compositions/pages/logWindow/logWindow'

function CustomRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="" element={<DashboardPage />} />
      <Route path="log" element={<LogWindow />} />
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  )
}

export default CustomRoutes
