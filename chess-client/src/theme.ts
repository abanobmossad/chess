import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,

};

// 3. extend the theme
const theme = extendTheme({
  config, styles: {
    global: () => ({
      body: {
        bg: '',
      },
    }),
  },
  colors: {
    gray: {
      700: '#272522',
    },
  },
});

export default theme;