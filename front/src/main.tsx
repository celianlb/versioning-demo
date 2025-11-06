import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRootRoute, createRouter } from '@tanstack/react-router'
import Layout from './routes/_layout'

const rootRoute = createRootRoute({
  component: Layout,
})

const router = createRouter({ routeTree: rootRoute })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)