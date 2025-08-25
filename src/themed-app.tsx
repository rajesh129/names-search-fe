import { ThemeProvider, createTheme } from '@mui/material/styles'
import { frFR, enUS } from '@mui/material/locale' // add if using fr/en packs
import { useTranslation } from 'react-i18next'
import React from 'react'
import theme from './theme'

function ThemedApp({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const lng = i18n.language

  const baseTheme  = React.useMemo(() => {
    const base = createTheme({...theme})
    if (lng.startsWith('fr')) return createTheme(base, frFR)
    // English UI tweaks
    if (lng.startsWith('en')) return createTheme(base, enUS)
    // Tamil: fallback to base; add your own overrides if needed
    return base
  }, [lng])

  return <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>
}

export default ThemedApp;