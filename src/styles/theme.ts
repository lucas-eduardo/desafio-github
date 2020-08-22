import { theme, DefaultTheme } from '@chakra-ui/core';

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    heading: 'Roboto Slab, sans-serif',
    body: 'Roboto Slab, sans-serif',
    mono: 'Menlo, monospace',
  },
};

export { customTheme };
