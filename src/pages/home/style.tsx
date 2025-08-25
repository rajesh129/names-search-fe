import { styled } from '@mui/material'

export const StyledH2 = styled('h2')(({ theme }) => ({
  ...theme.typography.h2, // use your h1 typography from theme
  color: theme.palette.primary.main, // maroon from your theme
  marginBottom: theme.spacing(2), // spacing helper
  textAlign: 'center',
}))

export const StyledSubTitle = styled('p')(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2), // spacing helper
  textAlign: 'center',
  fontSize: '24px',
}))

export const CulturalHeritageTitle = styled('h4')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.primary.light,
  padding: theme.spacing(2), // spacing helper
  textAlign: 'center',
  margin: 0,
  fontWeight: theme.typography.fontWeightMedium,
}))

export const FrequentlySearchedTitle = styled('h4')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.primary,
  padding: theme.spacing(2), // spacing helper
  textAlign: 'center',
  margin: 0,
  fontWeight: theme.typography.fontWeightMedium,
}))

export const FrequentlySearchedSubTitle = styled('p')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
  textAlign: 'center',
  margin: 0,
  marginBottom: theme.spacing(2), // spacing helper
}))
