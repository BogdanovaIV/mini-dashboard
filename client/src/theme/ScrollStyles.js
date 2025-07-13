import { GlobalStyles } from '@mui/material';

/**
 * ScrollStyles component applies global custom scrollbar styles
 * based on the current theme mode (light or dark).
 *
 * This component uses MUI's GlobalStyles to style scrollbars across
 * the entire application. Styles are compatible with WebKit-based
 * browsers (Chrome, Edge, Safari) and partially with Firefox.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {'light' | 'dark'} props.mode - The current theme mode.
 *
 * @example
 * <ScrollStyles mode="dark" />
 *
 * @returns {JS.Element} GlobalStyles component with applied scrollbar styles.
 */
const ScrollStyles = ({ mode }) => {
  return (
    <GlobalStyles
      styles={{
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f0f0f0',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: mode === 'dark' ? '#444' : '#aaa',
          borderRadius: '8px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: mode === 'dark' ? '#666' : '#888',
        },
        '*': {
          scrollbarWidth: 'thin', // for Firefox
          scrollbarColor: mode === 'dark' ? '#444 #1a1a1a' : '#aaa #f0f0f0',
        },
      }}
    />
  );
};

export default ScrollStyles;