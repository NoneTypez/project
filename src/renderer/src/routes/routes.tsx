import { Routes, Route } from 'react-router-dom'
import EmptyPage from '@renderer/compositions/emptyPage/emptyPage'
import { JSX } from 'react'

function CustomRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="" element={<EmptyPage text="Dashboard" />} />
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  )
}

export default CustomRoutes
