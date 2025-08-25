import React from 'react'
import { CssBaseline, Box, GlobalStyles } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import ThemedApp from './themed-app'
import LanguageGate from './language-gate'

export default function App() {
  const HomePage = React.lazy(() => import('./pages/home'))
  const SearchPage = React.lazy(() => import('./pages/search'))

  return (
    <ThemedApp>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundImage: 'none',
          },
        }}
      />
      <Box sx={{ minHeight: '100dvh', display: 'grid' }}>
        <Routes>
          <Route path="/:lng" element={<LanguageGate />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/en/home" replace />} />
        </Routes>
      </Box>
    </ThemedApp>
  )
}
