import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../theme/GlobalStyles';
import { theme } from '../../theme/mainTheme';

const Root = () => (
  <div>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <>
        <h1>Hello World</h1>
      </>
    </ThemeProvider>
  </div>
);

export default Root;
