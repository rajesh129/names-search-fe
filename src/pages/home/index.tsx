import React from 'react'
import { Typography, Paper, Container, Box, Stack, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CulturalHeritageTitle, FrequentlySearchedSubTitle, FrequentlySearchedTitle, StyledH2, StyledSubTitle } from './style'
import SearchBar from '../../components/ui/SearchBar'
import theme from '../../theme'
import { FrequentlySearchedNames } from '../../components/ui/FrequentlySearchedNames'
import { Footer } from '../../components/ui/Footer'
import { SearchForm } from '../../components/ui/SearchBarForm'
import { useNavigate, useParams } from 'react-router-dom'

export default function HomePage() {
const { t } = useTranslation();
const navigate = useNavigate()
  const { lng = 'en' } = useParams()

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <Container maxWidth='lg'>
            <StyledH2>{t('home.title')}</StyledH2>
            <StyledSubTitle>{t('home.intro')}</StyledSubTitle>
            <SearchForm initialQuery="" onSubmitQuery={
                (query) => {
                    const q = query.trim()
                    if (q) {
                    navigate(`/${lng}/search?q=${encodeURIComponent(q)}`)
                    }
                }
            } />
        </Container>
        <Container>
            <Paper 
                elevation={0} 
                sx={{
                    padding: theme.spacing(4)
                }}
            >
                <CulturalHeritageTitle>{t('home.culturalHeritageTitle')}</CulturalHeritageTitle>
                <p>{t('home.culturalHeritageDescription')}</p>
            </Paper>
        </Container>
        <Container sx={{marginBottom: theme.spacing(2)}}>
            <FrequentlySearchedTitle>{t('home.frequentlySearchedTitle')}</FrequentlySearchedTitle>
            <FrequentlySearchedSubTitle>{t('home.frequentlySearchedSubtitle')}</FrequentlySearchedSubTitle>
            <FrequentlySearchedNames />
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: theme.spacing(4)}}>
                <Button variant="contained" >{t('home.exploreMoreNamesBtn')}</Button>
            </Box>
        </Container>
        <Footer />
    </div>
  )
}
