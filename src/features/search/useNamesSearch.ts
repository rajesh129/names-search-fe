// src/features/search/useNamesSearch.ts
import * as React from 'react'
import { searchNames } from '../../services/get-names'
import type { NameItem } from '../../types/get-names'

type State = {
  items: NameItem[]
  total: number
  loading: boolean
  error: string | null
}

export function useNamesSearch({
  q,
  page,
  pageSize,
  language,
}: {
  q: string
  page: number
  pageSize: number
  language: 'en' | 'fr' | 'ta'
}) {
  const [state, setState] = React.useState<State>({
    items: [],
    total: 0,
    loading: false,
    error: null,
  })

  React.useEffect(() => {
    if (!q) {
      setState({ items: [], total: 0, loading: false, error: null })
      return
    }
    const controller = new AbortController()

    ;(async () => {
      setState((s) => ({ ...s, loading: true, error: null }))
      try {
        const data = await searchNames({
          searchText: q,
          lang: language,
          pagePerRecord: pageSize,
          page,
        })
        setState({
          items: data.getNames,
          total: data.totalCount,
          loading: false,
          error: null,
        })
      } catch (e: any) {
        if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') return
        const msg =
          e?.message?.includes('Network Error')
            ? 'Network error. In dev, enable Vite proxy or API CORS.'
            : e?.message || 'Failed to fetch results'
        setState({ items: [], total: 0, loading: false, error: msg })
      }
    })()

    return () => controller.abort()
  }, [q, page, pageSize, language])

  const pageCount = Math.max(1, Math.ceil(state.total / pageSize))
  return { ...state, pageCount }
}
