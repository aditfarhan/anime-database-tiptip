import { StoreProvider } from 'easy-peasy';
import store from 'utils/store';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'styles/globals.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Rubik'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Rubik'
        }
      }
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;
