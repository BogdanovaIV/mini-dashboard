import React, { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ScrollStyles from './theme/ScrollStyles';

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollStyles mode={mode} />
      <Navbar mode={mode} toggleTheme={toggleTheme} />
      <Home />
    </ThemeProvider>
  );
}

export default App;
