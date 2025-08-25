import { Grid2 } from '@mui/material'
import { FooterContainer, FooterSubTitle, FooterTitle, SubFooterContainer } from './style'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <FooterContainer>
      <Grid2 container direction="row" spacing={4}>
        <Grid2 size={{ xs: 6 }}>
          <FooterTitle>{t('footer.title')}</FooterTitle>
          <FooterSubTitle>{t('footer.subTitle')}</FooterSubTitle>
        </Grid2>
        <Grid2 size={{ xs: 3 }}>
          <FooterTitle>{t('footer.explore')}</FooterTitle>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12 }}>{t('footer.englishNames')}</Grid2>
            <Grid2 size={{ xs: 12 }}>{t('footer.tamilNames')}</Grid2>
            <Grid2 size={{ xs: 12 }}>{t('footer.frenchNames')}</Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 3 }}>
          <FooterTitle>{t('footer.community')}</FooterTitle>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12 }}>{t('footer.aboutUs')}</Grid2>
            <Grid2 size={{ xs: 12 }}>{t('footer.contactUs')}</Grid2>
            <Grid2 size={{ xs: 12 }}>{t('footer.submitAName')}</Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
      <SubFooterContainer>{t('footer.copyrightText')}</SubFooterContainer>
    </FooterContainer>
  )
}
