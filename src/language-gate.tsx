// src/routes/LanguageGate.tsx
import * as React from 'react'
import { Outlet, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LinearProgress, Box } from '@mui/material'

const SUPPORTED = new Set(['en', 'ta', 'fr'])

export default function LanguageGate() {
  const { lng } = useParams() as { lng?: string }
  const { i18n } = useTranslation()

  // normalize/validate
  const target = (lng || 'en').split('-')[0]
  if (!SUPPORTED.has(target)) {
    return <Navigate to="/en/home" replace />
  }

  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    const current = i18n.resolvedLanguage?.split('-')[0]

    // Change language only if different
    const ensureLang = async () => {
      if (current !== target) {
        await i18n.changeLanguage(target)
      }
      if (!cancelled) setReady(true)
    }

    ensureLang()
    return () => {
      cancelled = true
    }
    // include i18n.resolvedLanguage to catch lazy init
  }, [target, i18n])

  if (!ready) {
    return (
      <Box sx={{ p: 2 }}>
        <LinearProgress />
      </Box>
    )
  }

  return <Outlet />
}
