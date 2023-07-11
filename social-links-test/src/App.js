import { CacheProvider, ThemeProvider } from "@emotion/react";
import { createTheme, Switch } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import Body from "./components/Body";
import { useState } from "react";
import { Box } from "@mui/system";

function App() {
  const [mode, setMode] = useState("dark");

  const handleChange = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = createTheme({
    // direction: "rtl",
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: "#ffa726",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#FB679F",
              contrastText: "#ffffff",
            },
            error: {
              main: "#f44336",
            },
            divider: "#635F57",
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#ffa726",
            },
            background: {
              paper: "#495864",
            },
          }),
    },
    typography: {
      fontFamily: ["IranSans"].join(","),
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              borderRadius: "10px",
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              borderRadius: "10px",
              contrastText: " #fff",
            },
          },
          {
            props: { variant: "text" },
            style: {
              fontSize: "smaller",
              borderRadius: "10px",
            },
          },
        ],
      },
    },
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <Box
          sx={{
            minHeight: "100vh",
            background: mode === "dark" ? "#2c2c35" : "white",
            color: mode === "dark" ? "white" : "#303030",
          }}
        >
          {"تاریک"}
          <Switch onChange={handleChange} />
          {"روشن"}
          <Body mode={mode} />
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
