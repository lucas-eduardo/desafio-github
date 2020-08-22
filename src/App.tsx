import React from 'react';

import { ThemeContext } from './contexts/theme/ThemeContext';
import { AppProvider } from './hooks';

import { Home } from './pages/Home';

function App() {
  return (
    <ThemeContext>
      <AppProvider>
        <Home />
      </AppProvider>
    </ThemeContext>
  );
}

export default App;
