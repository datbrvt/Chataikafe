import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

/**
 * CUSTOM MODELS
 */
import router from './routers/router'

/**
 * Components
 */

import SnackbarProvider from './contexts/SnackbarContext'
/**
 * CSS link
 */

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
)
