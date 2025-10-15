// src/hooks/useSearchRouting.ts
import * as React from 'react'
import { useSearchParams, useParams } from 'react-router-dom'

export function useSearchRouting() {
  const [params, setParams] = useSearchParams();
  const [lang, setLang] = React.useState<'en' | 'fr' | 'ta'>('en');
  const { lng = 'en' } = useParams()
  const routeLanguage = (lng.split('-')[0] as 'en' | 'fr' | 'ta') || 'en'

  const q = params.get('q') ?? ''
  const page = Number(params.get('page') ?? '1')
  const l = params.get('l') ?? '';

  const setQ = React.useCallback(
    (nextQ: string, lang: string) => {
      const next = new URLSearchParams(params);
      setLang(l || lang);
      if (nextQ.trim()) {
        next.set('q', nextQ.trim())
        next.set('page', '1') // reset when query changes
      } else {
        next.delete('q')
        next.delete('page')
        next.delete('l');
      }
      setParams(next, { replace: true })
    },
    [params, setParams, setLang, lang],
  )

  React.useEffect(() => {
    if(l) {
      setLang(l as 'en' | 'fr' | 'ta');
      return;
    }
    if (routeLanguage !== lang) {
      setLang(lang);
    }
    
  }, [lang]);

  const setPage = React.useCallback(
    (nextPage: number) => {
      const next = new URLSearchParams(params)
      next.set('page', String(nextPage))
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  return { q, page, setQ, setPage, language: lang }
}
