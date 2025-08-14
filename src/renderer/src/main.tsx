import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import SideBar from './compositions/sidebar/sidebar'
import Window from './compositions/window/window'
import Footer from './compositions/footer/footer'
import CustomRoutes from './routes/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <SideBar />
      <div className="container">
        <Window>
          <CustomRoutes />
        </Window>
        <Footer />
      </div>
    </HashRouter>
  </StrictMode>
)
