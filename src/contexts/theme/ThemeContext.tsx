import React from 'react';

import {
  ThemeProvider as ChakraThemeProvider,
  ColorModeProvider,
  CSSReset,
} from '@chakra-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import { customTheme } from '../../styles/theme';

const ThemeContext: React.FC = ({ children }) => (
  <ChakraThemeProvider theme={customTheme}>
    <ColorModeProvider value="dark">
      <EmotionThemeProvider theme={customTheme}>
        <CSSReset />
        {children}
      </EmotionThemeProvider>
    </ColorModeProvider>
  </ChakraThemeProvider>
);

export { ThemeContext };
