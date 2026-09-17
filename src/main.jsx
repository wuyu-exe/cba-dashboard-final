import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlossaryProvider } from './components/GlossaryText.jsx'
import { isEmbed } from './embed.js'

if (isEmbed) document.documentElement.dataset.embed = '1'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlossaryProvider>
      <App />
    </GlossaryProvider>
  </StrictMode>,
)
