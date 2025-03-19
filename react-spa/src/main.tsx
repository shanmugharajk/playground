import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '~/styles/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="m-10">React app</div>
  </StrictMode>
)
