import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'

import { App } from '~/components/app'

import '~/styles/main.css'

let router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
