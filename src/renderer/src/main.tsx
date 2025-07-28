import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import SideBar from './compositions/sidebar/sidebar'
import Window from './compositions/window/window'
import Footer from './compositions/footer/footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SideBar />
    <div className="container">
      <Window />
      <Footer />
    </div>
  </StrictMode>
)
