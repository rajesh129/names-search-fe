import { Box, styled } from "@mui/material";

export const FooterContainer = styled(Box)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(4),
    backgroundColor: theme.palette.accent.dark,
    color: theme.palette.primary.contrastText,
}))

export const FooterTitle = styled('p')(({ theme }) => ({
  ...theme.typography.h5,
  margin: 0,
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(1),   
}));

export const FooterSubTitle = styled('p')(({ theme }) => ({
  margin: 0,
  fontWeight: theme.typography.fontWeightRegular,
  marginBottom: theme.spacing(1),   
}));

export const SubFooterContainer = styled('p')(({ theme }) => ({
    backgroundColor: theme.palette.accent.main,
  textAlign: "center",
  fontWeight: theme.typography.fontWeightRegular,
  padding: theme.spacing(1),
  marginTop: theme.spacing(4),
  marginLeft: theme.spacing(-4),
  marginRight: theme.spacing(-4),
  marginBottom: theme.spacing(-2),
}));