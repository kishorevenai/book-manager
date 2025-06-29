import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: `'Lexend', 'Bebas Neue', 'Cascadia Mono', 'Kode Mono', sans-serif`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          // fontWeight: 600,
        },
        contained: {
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        color: "primary",
      },
    },
  },
});

export default theme;
