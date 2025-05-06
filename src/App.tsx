import { ThemeProvider } from 'styled-components';

import { HashRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
import { CycleContextProvider } from './contexts/CyclesContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <HashRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </HashRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}