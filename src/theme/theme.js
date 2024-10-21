import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 500,
      lineHeight: '120%', // 57.6px
      letterSpacing: '-0.48px',
      color: '#000',
    },
    h2: {
      fontSize: '40px',
      fontWeight: 500,
      lineHeight: '120%',
      color: '#000',
    },
    h3: {
      fontSize: '33px',
      fontWeight: 400,
      lineHeight: '120%', // 39.6px
      letterSpacing: '-0.33px',
      color: '#000',
    },
    h4: {
      fontSize: '28px',
      fontWeight: 500,
      lineHeight: '120%', // 33.6px
      color: '#000',
    },
    h5: {
      fontSize: '23px',
      fontWeight: 500,
      lineHeight: '120%', // 27.6px
      fontFeatureSettings: "'ss01' on",
      color: '#000',
    },
    h6: {
      fontSize: '19px',
      fontWeight: 500,
      lineHeight: '120%', // 22.8px
      color: '#000',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '160%', // 25.6px
      color: '#000',
    },
    caption: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '120%', // 15.6px
      letterSpacing: '-0.4px',
      color: '#000',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        common: {
          white: '#FBFCFC', // Light White
        },
        primary: {
          main: '#343A40', // Txt main
        },
        secondary: {
          main: '#504E4E', // Txt secondary
        },
        accentOrange: {
          main: '#FF8919', // Accent Orange
        },
        accentYellow: {
          main: '#FFD133', // Accent Yellow
        },
        accentBlue: {
          main: '#4886FF', // Accent Blue
        },
        grey: {
          100: '#E7E8EE', // Grey Light
          200: '#A4A4A4', // Dark Grey
        },
      },
    },
  },
});

export default theme;
