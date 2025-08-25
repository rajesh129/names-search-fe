// src/features/search/SearchResultsSkeleton.tsx
import React from 'react'
import { Stack, Paper, Skeleton } from '@mui/material'

export function SearchResultsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: count }).map((_, idx) => (
        <Paper key={idx} sx={{ p: 2 }}>
          <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="rectangular" height={40} sx={{ mt: 2, borderRadius: 1 }} />
        </Paper>
      ))}
    </Stack>
  )
}
