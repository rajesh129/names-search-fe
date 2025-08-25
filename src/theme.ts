// src/theme.ts
import { createTheme } from "@mui/material/styles";

// ---- Brand colors (from your palette) ----
const MAROON = "#800000";      // Primary
const CRIMSON = "#A52A2A";     // Secondary (deeper red)
const WINE_RED = "#5C1A1A";    // Darker tone (app bar/footer)
const GOLD = "#C9A635";        // Accent
const BLUSH = "#F2D7D5";       // Soft surfaces
const LIGHT_GRAY = "#F4F4F4";  // Base bg
const CHARCOAL = "#2C2C2C";    // Body text
const WHITE = "#FFFFFF";       // Contrast text

// ---- TypeScript palette augmentation for a custom "accent" color + neutrals ----
declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
    neutrals: {
      light: string;
      dark: string;
      white: string;
    };
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
    neutrals?: {
      light?: string;
      dark?: string;
      white?: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    accent: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    accent: true;
  }
}

export const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: "light",
    primary: {
      main: MAROON,
      light: "#9a1a1a",
      dark: WINE_RED,
      contrastText: WHITE,
    },
    secondary: {
      main: CRIMSON,
      light: "#bd3f3f",
      dark: "#7b1d1d",
      contrastText: WHITE,
    },
    // Custom accent (gold) usable like color="accent"
    accent: {
      main: GOLD,
      light: "#d8ba53",
      dark: "#9f7f1f",
      contrastText: CHARCOAL,
    },
    success: {
      main: "#2e7d32",
    },
    info: {
      main: "#0288d1",
    },
    warning: {
      main: "#ed6c02",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: LIGHT_GRAY,
      paper: WHITE,
    },
    text: {
      primary: CHARCOAL,
      secondary: "#4c4c4c",
    },
    divider: "#e7e7e7",
    neutrals: {
      light: LIGHT_GRAY,
      dark: CHARCOAL,
      white: WHITE,
    },
  },

  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: WINE_RED,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        containedPrimary: {
          // maroon button hover a touch darker
          ":hover": { backgroundColor: "#6d0000" },
        },
        outlinedPrimary: {
          borderWidth: 2,
          ":hover": { borderWidth: 2 },
        },
      },
      variants: [
        // Accent = gold CTAs
        {
          props: { variant: "contained", color: "accent" as any },
          style: {
            backgroundColor: GOLD,
            color: CHARCOAL,
            ":hover": { backgroundColor: "#B8942B" },
          },
        },
        {
          props: { variant: "outlined", color: "accent" as any },
          style: {
            borderColor: GOLD,
            color: GOLD,
            ":hover": { borderColor: "#B8942B", backgroundColor: "#fff7e0" },
          },
        },
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { color: "accent" as any, variant: "filled" },
          style: {
            backgroundColor: GOLD,
            color: CHARCOAL,
            fontWeight: 600,
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid #eee",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            `linear-gradient(0deg, transparent 0%, transparent 96%, ${BLUSH} 96%)`,
          backgroundSize: "100% 32px",
        },
      },
    },
  },
});

export default theme;
