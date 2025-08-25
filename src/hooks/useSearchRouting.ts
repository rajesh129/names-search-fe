// src/hooks/useSearchRouting.ts
import * as React from 'react'
import { useSearchParams, useParams } from 'react-router-dom'

export function useSearchRouting() {
  const [params, setParams] = useSearchParams()
  const { lng = 'en' } = useParams()
  const language = (lng.split('-')[0] as 'en' | 'fr' | 'ta') || 'en'

  const q = params.get('q') ?? ''
  const page = Number(params.get('page') ?? '1')

  const setQ = React.useCallback(
    (nextQ: string) => {
      const next = new URLSearchParams(params)
      if (nextQ.trim()) {
        next.set('q', nextQ.trim())
        next.set('page', '1') // reset when query changes
      } else {
        next.delete('q')
        next.delete('page')
      }
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  const setPage = React.useCallback(
    (nextPage: number) => {
      const next = new URLSearchParams(params)
      next.set('page', String(nextPage))
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  return { q, page, setQ, setPage, language }
}
