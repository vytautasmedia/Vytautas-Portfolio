import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import PrivatumoPolitika from './pages/PrivatumoPolitika'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/privatumo-politika', element: <PrivatumoPolitika /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
