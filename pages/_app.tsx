

import '@/styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import type { AppProps } from 'next/app'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { initApp } from '@/services/login'
import { useState } from 'react'

const theme = createTheme({
  palette: {
    primary: { main: '#2d3341' },
    secondary: { main: '#a9b0c0' },
  },
})




export default function App ({ Component, pageProps }: AppProps) {

  initApp()

  const [ showComponent, setShowComponent ] = useState(false)
  const router = useRouter()
  const { user, loading } = useAuth()

  if (typeof window !== 'undefined' && !loading) {
    if (user == null && router.pathname !== '/') {
      router.replace('/')
    }
    else if (user != null && router.pathname === '/') {
      router.replace('/home')
    }
    else if (!showComponent) {
      setShowComponent(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div id="app">
        <div id="page">
          <div className="page-content">
            {showComponent && <Component {...pageProps} />}
          </div>
        </div>
      </div>
    </LocalizationProvider>
    </ThemeProvider>
  )
}

