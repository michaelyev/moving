/* Добавь это в tailwind.config.js для кастомных значений типографики и цветов */

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins, sans-serif'],
      },
      colors: {
        black: '#000',
        white: '#FBFCFC',
        primary: '#343A40',
        secondary: '#504E4E',
        accentOrange: '#FF8919',
        accentYellow: '#FFD133',
        accentBlue: '#4886FF',
        greyLight: '#E7E8EE',
        greyDark: '#A4A4A4',
      },
      letterSpacing: {
        tightest: '-0.48px',
        tighter: '-0.33px',
        tight: '-0.4px',
      },
      lineHeight: {
        h1: '57.6px', // 120% of 48px
        h2: '120%',
        h3: '120%',
        h4: '120%',
        h5: '120%',
        h6: '120%',
        body: '160%',
      },
    },
  },
};
