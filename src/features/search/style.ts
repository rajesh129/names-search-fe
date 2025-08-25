import { styled, Typography } from "@mui/material";

export const SearchResultTitle = styled('h4')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(2),    // spacing helper
  margin: 0,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const SearchTypePrimary = styled(Typography)(({theme}) => ({
    fontSize: '20px',
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2)
}));

export const SearchTypeSecondary = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(1)
}))