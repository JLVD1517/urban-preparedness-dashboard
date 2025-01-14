import { createTheme, lighten } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';

export const mapGradientDark = {
  step1: '#FEE5D9',
  step2: '#FCBBA1',
  step3: '#FC9272',
  step4: '#FB6A4A',
  step5: '#DE2D26',
  step6: '#A50F15',
}

export const mapGradientLight = {
  step1: '#EFF3FF',
  step2: '#C6DBEF',
  step3: '#9ECAE1',
  step4: '#6BAED6',
  step5: '#3182BD',
  step6: '#08519C',
};

export const themeOverrides: Overrides = {
  MuiButton: {
    label: {
      textTransform: 'capitalize',
    },
  },
};

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: mapGradientDark.step1,
      light: mapGradientDark.step2,
    },
    secondary: {
      main: '#FDCDBA',
    },
    background: {
      default: '#1E1E1E',
    },
    warning: {
      main: '#F3F800',
    },
  },
  overrides: themeOverrides,
});

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: mapGradientLight.step6,
    },
    secondary: {
      main: '#A5CDE4',
    },
    background: {
      default: '#F3F3F3',
    },
    warning: {
      main: '#DBDB0F',
    },
  },
  overrides: themeOverrides,
});

darkTheme.overrides = {
  ...darkTheme.overrides,
  MuiCssBaseline: {
    '@global': {
      // style the link text
      '.MuiLink-root': {
        color: `${darkTheme.palette.primary.light} !important`,
      },

      // style the geocoder input text
      '.mapboxgl-ctrl-geocoder--input': {
        color: `${darkTheme.palette.text.primary} !important`,
      },

      // style the placeholder text
      '.mapboxgl-ctrl-geocoder--input::placeholder': {
        color: `${darkTheme.palette.text.secondary} !important`,
      },

      // style the background of the clear button in the text input
      '.mapboxgl-ctrl-geocoder--button': {
        background: `${lighten(
          `${darkTheme.palette.background.default}`,
          0.1,
        )} !important`,
      },

      // style the background of the text input
      '.mapboxgl-ctrl-geocoder': {
        backgroundColor: `${lighten(
          `${darkTheme.palette.background.default}`,
          0.1,
        )} !important`,
      },
      // style the focus theme
      '.mapboxgl-ctrl-geocoder--input:focus': {
        outline: `1px solid ${darkTheme.palette.primary.main} !important`,
        borderRadius: '4px',
      },

      // style suggestion text
      '.mapboxgl-ctrl-geocoder .suggestions > li > a': {
        color: `${darkTheme.palette.text.primary} !important`,
      },

      // style active suggestion
      '.suggestions > .active > a, .mapboxgl-ctrl-geocoder .suggestions > li': {
        backgroundColor: `${darkTheme.palette.primary.main} !important`,
      },

      //  style sugestion background color
      '.suggestions > a, .mapboxgl-ctrl-geocoder >.suggestions > a, .mapboxgl-ctrl-geocoder .suggestions > li': {
        backgroundColor: `${darkTheme.palette.background.default} !important`,
      },

      // style hovered suggestions
      '.suggestions > a, .mapboxgl-ctrl-geocoder >.suggestions > a, .mapboxgl-ctrl-geocoder .suggestions > li > :hover': {
        backgroundColor: `${darkTheme.palette.secondary.main} !important`,
        color: `${darkTheme.palette.background.default} !important`,
      },
    },
  },
};

lightTheme.overrides = {
  ...lightTheme.overrides,
  MuiCssBaseline: {
    '@global': {
      // style the geocoder input text
      '.mapboxgl-ctrl-geocoder--input': {
        color: `${lightTheme.palette.background.paper} !important`,
      },

      // style the placeholder text
      '.mapboxgl-ctrl-geocoder--input::placeholder': {
        color: `${lightTheme.palette.background.paper} !important`,
      },

      // style the background of the clear button
      '.mapboxgl-ctrl-geocoder--button': {
        background: `${lighten(
          `${lightTheme.palette.primary.main}`,
          0.1,
        )} !important`,
      },

      // style the background color of the input
      '.mapboxgl-ctrl-geocoder': {
        backgroundColor: `${lighten(
          `${lightTheme.palette.primary.main}`,
          0.1,
        )} !important`,
      },

      // adjust color of icon in search bar
      '.mapboxgl-ctrl-geocoder--icon': {
        fill: `${lightTheme.palette.background.paper} !important`,
      },

      // style the focus theme
      '.mapboxgl-ctrl-geocoder--input:focus': {
        outline: `1px solid ${lightTheme.palette.primary.main} !important`,
        borderRadius: '4px',
      },

      // style active suggestion
      '.suggestions > .active > a, .mapboxgl-ctrl-geocoder .suggestions > li': {
        backgroundColor: `${lightTheme.palette.primary.main} !important`,
      },

      // style active suggestion text
      'ul.suggestions li.active a div.mapboxgl-ctrl-geocoder--suggestion': {
        color: `${lightTheme.palette.background.paper} !important`,
      },

      // style suggestion text
      '.mapboxgl-ctrl-geocoder .suggestions > li > a': {
        color: `${lightTheme.palette.text.primary} !important`,
      },

      //  style sugestion background color
      '.suggestions> a, .mapboxgl-ctrl-geocoder >.suggestions > a, .mapboxgl-ctrl-geocoder .suggestions > li': {
        backgroundColor: `${lightTheme.palette.background.default} !important`,
      },

      // style hovered suggestions
      '.suggestions> a, .mapboxgl-ctrl-geocoder >.suggestions > a, .mapboxgl-ctrl-geocoder .suggestions > li > :hover': {
        backgroundColor: `${lightTheme.palette.secondary.main} !important`,
        color: `${lightTheme.palette.action.active} !important`,
      },
    },
  },
};
