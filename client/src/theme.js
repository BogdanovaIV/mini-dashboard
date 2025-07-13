import { createTheme } from '@mui/material/styles';

/**
 * Returns a Material UI theme configuration based on the specified mode.
 *
 * This function generates a custom MUI theme with light or dark palette settings,
 * including background colors for the `default` and `paper` surfaces.
 *
 * @param {'light' | 'dark'} mode - The theme mode to apply.
 * @returns {Theme} A Material UI theme object configured for the given mode.
 *
 * @example
 * const theme = getTheme('dark');
 * <ThemeProvider theme={theme}>...</ThemeProvider>
 */
export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f2f2f2',
              paper: '#fff',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
  });