// src/pages/search/index.tsx
import * as React from 'react'
import { Container, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Footer } from '../../components/ui/Footer'
import { StyledH2, StyledSubTitle } from '../home/style'
import { useSearchRouting } from '../../hooks/useSearchRouting'
import { useNamesSearch } from '../../features/search/useNamesSearch'
import { SearchResults } from '../../features/search/search-results'
import { SearchForm } from '../../components/ui/SearchBarForm'

const PAGE_SIZE = 10

export default function SearchPage() {
  const { t } = useTranslation()
  const { q, page, setQ, setPage, language } = useSearchRouting()

  const { items, total, loading, error, pageCount } = useNamesSearch({
    q,
    page,
    pageSize: PAGE_SIZE,
    language,
  })

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <Container maxWidth="lg">
        <StyledH2>{t('home.title')}</StyledH2>
        <StyledSubTitle>{t('home.intro')}</StyledSubTitle>

        <Stack spacing={3}>
          <SearchForm initialQuery={q} onSubmitQuery={setQ} title={t('search.title', { defaultValue: 'Search' })} />

          <SearchResults
            items={items}
            total={total}
            page={page}
            pageCount={pageCount}
            loading={loading}
            error={error}
            onPageChange={setPage}
          />
        </Stack>
      </Container>

      <Footer />
    </div>
  )
}
