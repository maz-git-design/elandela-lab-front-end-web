//mypreset.ts

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const ThemePreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  semantic: {
    primary: {
      50: '#cce0ff', // soft light blue
      100: '#99c2ff', // gentle blue
      200: '#6699ff', // medium blue
      300: '#3366ff', // deeper medium blue
      400: '#0047cc', // strong deep blue
      500: '#0033a0', // deep royal blue (base)
      600: '#002d8f', // darker deep blue
      700: '#00267a', // navy blue
      800: '#001f66', // deep navy
      900: '#00194d', // very dark blue
      950: '#001233', // almost black-blue
    },
    colorScheme: {
      light: {
        primary: {
          color: '{blue.600}',
          inverseColor: '#ffffff',
          hoverColor: '{blue.900}',
          activeColor: '{blue.800}',
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
      },
      dark: {
        primary: {
          color: '{blue.600}',
          inverseColor: '#ffffff',
          hoverColor: '{blue.900}',
          activeColor: '{blue.800}',
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
    },
  },

  components: {
    inputgroup: {
      colorScheme: {
        light: {
          addon: {
            background: '{blue.950}',
            color: 'white',
          },
        },
        dark: {},
      },
    },
    splitter: {
      colorScheme: {
        light: {},
        dark: {
          root: {},
        },
      },
    },
    inputtext: {
      colorScheme: {
        light: {},
        dark: {
          root: {},
        },
      },
    },
    tabs: {
      colorScheme: {
        light: {
          tab: {},
        },
        dark: {
          root: {},
        },
      },
    },
  },
});

export default ThemePreset;
