// src/features/search/SearchForm.tsx
import * as React from 'react'
import { Formik, Form, FormikValues } from 'formik'
import { Stack, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { searchSchema } from '../../../lib/validation'
import SearchBar from '../SearchBar'
import LanguageSwitch from '../LanguageSwitch'
import { useSearchParams } from 'react-router-dom'

export function SearchForm({
  initialQuery,
  onSubmitQuery,
  title = 'Search',
}: {
  initialQuery: string
  onSubmitQuery: (q: string, l: string) => void
  title?: string
}) {
  const { t } = useTranslation()
  const [params] = useSearchParams();
  return (
    <Formik
      initialValues={{ query: initialQuery }}
      validationSchema={searchSchema} // or your Unicode variant
      enableReinitialize
      onSubmit={({ query }) => {
        const language = params.get('l') ?? '';
        
        onSubmitQuery(query, language)
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }: FormikValues) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">{title}</Typography>
              <LanguageSwitch />
            </Box>

            <SearchBar
              value={values.query}
              onChange={handleChange('query')}
              error={Boolean(touched.query && errors.query)}
              helperText={
                touched.query && errors.query
                  ? (errors.query as string)
                  : t('home.searchHelperText')
              }
              // IconButton in SearchBar has type="submit"
            />
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
