import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import SideBar from './compositions/sidebar/sidebar'
import Window from './compositions/window/window'
import Footer from './compositions/footer/footer'
import CustomRoutes from './routes/routes'
import { Box } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <SideBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginLeft: '4px',
          padding: 0,
          height: 'auto'
        }}
      >
        <Window>
          <CustomRoutes />
        </Window>
        <Footer />
      </Box>
    </HashRouter>
  </StrictMode>
)
