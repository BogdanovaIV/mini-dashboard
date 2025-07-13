import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

/**
 * Navbar component that renders the top application bar with the title
 * and a theme toggle button.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {'light' | 'dark'} props.mode - The current theme mode.
 * @param {Function} props.toggleTheme - Function to toggle between light and dark themes.
 *
 * @example
 * <Navbar mode="light" toggleTheme={() => setMode('dark')} />
 *
 * @returns {JS.Element} The rendered AppBar component with a theme toggle button.
 */
const Navbar = ({ mode, toggleTheme }) => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mining Pools Dashboard
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;