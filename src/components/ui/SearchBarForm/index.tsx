// src/features/search/SearchForm.tsx
import * as React from 'react'
import { Formik, Form } from 'formik'
import { Stack, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { searchSchema } from '../../../lib/validation'
import SearchBar from '../SearchBar'

export function SearchForm({
  initialQuery,
  onSubmitQuery,
  title = 'Search',
}: {
  initialQuery: string
  onSubmitQuery: (q: string) => void
  title?: string
}) {
  const {t} = useTranslation();
  return (
    <Formik
      initialValues={{ query: initialQuery }}
      validationSchema={searchSchema} // or your Unicode variant
      enableReinitialize
      onSubmit={({ query }) => onSubmitQuery(query)}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5">{title}</Typography>

            <SearchBar
              value={values.query}
              onChange={handleChange('query')}
              error={Boolean(touched.query && errors.query)}
              helperText={
                touched.query && errors.query ? (errors.query as string) : t('home.searchHelperText')
              }
              // IconButton in SearchBar has type="submit"
            />
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
