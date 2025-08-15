import { Routes, Route } from 'react-router-dom'
import EmptyPage from '@renderer/compositions/pages/emptyPage/emptyPage'
import { JSX } from 'react'

import DashboardPage from '@renderer/compositions/pages/dashboard/dashboardPage'

function CustomRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="" element={<DashboardPage />} />
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  )
}

export default CustomRoutes
