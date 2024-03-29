const plattes = [
  'primary',
  'secondary',
  'trade',
  'white',
  'default',
  'success',
  'warning',
  'error',
  'vip',
]

const platteColors = Object.fromEntries(
  plattes.flatMap((c) => {
    return Object.entries({
      [`${c}-solid-c`]: `var(--du-${c}-solid-color)`,
      [`${c}-solid-bg`]: `var(--du-${c}-solid-bg)`,
      [`${c}-c`]: `var(--du-${c}-color)`,
      [`${c}-soft-bg`]: `var(--du-${c}-soft-bg)`,
      [`${c}-outline-c`]: `var(--du-${c}-outline-color)`,
      [`${c}-border`]: `var(--du-${c}-border)`,
      [`${c}-text-c`]: `var(--du-${c}-text-color)`,
      [`${c}-solid-disabledtemp-c`]: `var(--du-${c}-solid-disabledtemp-color)`,
      [`${c}-solid-disabledtemp-bg`]: `var(--du-${c}-solid-disabledtemp-bg)`,
      [`${c}-disabledtemp-c`]: `var(--du-${c}-disabledtemp-color)`,
      [`${c}-soft-disabledtemp-bg`]: `var(--du-${c}-soft-disabledtemp-bg)`,
      [`${c}-outline-disabledtemp-c`]: `var(--du-${c}-outline-disabledtemp-color)`,
      [`${c}-disabledtemp-border`]: `var(--du-${c}-disabledtemp-border)`,
      [`${c}-text-disabledtemp-c`]: `var(--du-${c}-text-disabledtemp-color)`,
      [`${c}-1`]: `var(--du-${c}-1)`,
      [`${c}-2`]: `var(--du-${c}-2)`,
      [`${c}-3`]: `var(--du-${c}-3)`,
      [`${c}-4`]: `var(--du-${c}-4)`,
      [`${c}-5`]: `var(--du-${c}-5)`,
      [`${c}-6`]: `var(--du-${c}-6)`,
      [`${c}-7`]: `var(--du-${c}-7)`,
      [`${c}-8`]: `var(--du-${c}-8)`,
      [`${c}-9`]: `var(--du-${c}-9)`,
    })
  }),
)

export const colorMap: any = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  ...platteColors,

  neutral: {
    100: 'rgba(0,0,0,0.04)',
    200: 'rgba(0,0,0,0.08)',
    300: 'rgba(0,0,0,0.12)',
    400: 'rgba(0,0,0,0.16)',
    500: 'rgba(0,0,0,0.24)',
    600: 'rgba(0,0,0,0.40)',
    700: 'rgba(0,0,0,0.64)',
    800: 'rgba(0,0,0,0.88)',
    900: '#000',
  },

  gray: {
    100: '#f7f7f9',
    200: '#ededf2',
    300: '#e1e1e5',
    400: '#d4d0da',
    500: '#bab5c4',
    600: '#918b9f',
    700: '#625e76',
    800: '#383950',
    900: '#2b263b',
  },

  grape: {
    100: '#f1e6ff',
    200: '#ebd4ff',
    300: '#d6b3ff',
    400: '#b688ff',
    500: '#ad69f7',
    600: '#8a4fd1',
    700: '#6838ab',
    800: '#4a2585',
    900: '#32195e',
  },

  blue: {
    100: '#e4ebf9',
    200: '#cce0ff',
    300: '#a6caff',
    400: '#8fb7ff',
    500: '#6c9aff',
    600: '#5077d9',
    700: '#3957b3',
    800: '#263c8c',
    900: '#1b2866',
  },

  zimablue: {
    100: '#dff7f7',
    200: '#cbf7f7',
    300: '#9df2f4',
    400: '#62deef',
    500: '#28bee0',
    600: '#009bbf',
    700: '#087599',
    800: '#005273',
    900: '#00344d',
  },

  turquoise: {
    100: '#e2f7f3',
    200: '#cdf9eb',
    300: '#9dedd9',
    400: '#77e5d2',
    500: '#36ccb6',
    600: '#17ad9b',
    700: '#14877e',
    800: '#076059',
    900: '#053b3a',
  },

  green: {
    100: '#e2f7e3',
    200: '#c9f2ca',
    300: '#9de09d',
    400: '#7ad37f',
    500: '#52ba5c',
    600: '#379e45',
    700: '#247842',
    800: '#145221',
    900: '#0f3d19',
  },

  yellow: {
    100: '#fffde6',
    200: '#fff9ca',
    300: '#ffe885',
    400: '#fad728',
    500: '#edbf00',
    600: '#c79800',
    700: '#a17600',
    800: '#7a5600',
    900: '#543800',
  },

  orange: {
    100: '#fff0e6',
    200: '#ffdfca',
    300: '#ffc299',
    400: '#ffa15a',
    500: '#fc7e22',
    600: '#d65d11',
    700: '#b04105',
    800: '#8a2c00',
    900: '#631c00',
  },

  red: {
    100: '#ffebe9',
    200: '#ffd1cf',
    300: '#ffabab',
    400: '#ff8380',
    500: '#f96464',
    600: '#d94a4e',
    700: '#b3343c',
    800: '#8c222c',
    900: '#661722',
  },

  pink: {
    100: '#f7dfec',
    200: '#ffcfe5',
    300: '#ffaed5',
    400: '#f980ba',
    500: '#ed64a5',
    600: '#c74a88',
    700: '#a1336e',
    800: '#7a2154',
    900: '#54163b',
  },

  tendershoots: {
    100: '#fbffe5',
    200: '#f4fec3',
    300: '#e4f689',
    400: '#cdee2b',
    500: '#b2d600',
    600: '#99b800',
    700: '#7f9900',
    800: '#667a00',
    900: '#4c5c00',
  },

  purple: {
    100: '#f2f0ff',
    200: '#d9d2ff',
    300: '#c7b8ff',
    400: '#958dff',
    500: '#7c66ff',
    600: '#5c4cd9',
    700: '#4036b3',
    800: '#28238c',
    900: '#1a1866',
    DEFAULT: '#7c66ff',
  },
  // qiandao merchant blue
  qdmBlue: {
    100: '#e6f4ff',
    200: '#bae0ff',
    300: '#91caff',
    400: '#69b1ff',
    500: '#4096ff',
    600: '#1677ff',
    700: '#0958d9',
    800: '#003eb3',
    900: '#1b2866',
    DEFAULT: '#1677ff',
  },

  // qihuo orange
  qhOrange: {
    100: '#ffeadb',
    200: '#ffd7ba',
    300: '#ffbf8f',
    400: '#ffa35c',
    500: '#ff812c',
    DEFAULT: '#ff812c',
    600: '#db6b1f',
    700: '#b85512',
    800: '#99440b',
    900: '#753104',
  },

  // mihua purple
  mhPurple: {
    100: '#E0DEFF',
    200: '#CFCCFF',
    300: '#BFBAFF',
    400: '#AEA8FF',
    500: '#9D96FF',
    DEFAULT: '#9D96FF',
    600: '#6F68DC',
    700: '#4A42BA',
    800: '#2C2497',
    900: '#150E75',
  },

  // mihua green
  mhGreen: {
    100: '#E9FCD0',
    200: '#DAFAB1',
    300: '#C9F590',
    400: '#BCF274',
    500: '#AEF056',
    DEFAULT: '#AEF056',
    600: '#91D13D',
    700: '#74B027',
    800: '#5B9114',
    900: '#437008',
  },
}

const shortCuts = {
  'text-h1': 'text-24 fw-500 lh-30',
  'text-h2': 'text-20 fw-500 lh-26',
  'text-h3': 'text-18 fw-500 lh-25',
  'text-h4': 'text-16 fw-500 lh-24',
  'text-h5': 'text-14 fw-500 lh-22',
  'text-h6': 'text-12 fw-500 lh-18',
  'text-h7': 'text-11 fw-500 lh-13',
  'text-h8': 'text-10 fw-500 lh-11',

  'text-b1': 'text-24 fw-400 lh-30',
  'text-b2': 'text-20 fw-400 lh-26',
  'text-b3': 'text-18 fw-400 lh-25',
  'text-b4': 'text-16 fw-400 lh-24',
  'text-b5': 'text-14 fw-400 lh-22',
  'text-b6': 'text-12 fw-400 lh-18',
  'text-b7': 'text-11 fw-400 lh-13',
  'text-b8': 'text-10 fw-400 lh-11',

  'text-n1': 'text-24 font-num fw-500 lh-30',
  'text-n2': 'text-20 font-num fw-500 lh-26',
  'text-n3': 'text-18 font-num fw-500 lh-25',
  'text-n4': 'text-16 font-num fw-500 lh-24',
  'text-n5': 'text-14 font-num fw-500 lh-22',
  'text-n6': 'text-12 font-num fw-500 lh-18',
  'text-n7': 'text-11 font-num fw-500 lh-13',
  'text-n8': 'text-10 font-num fw-500 lh-11',
}

export const reversedShortCuts = Object.entries(shortCuts).reduce(
  (acc, [key, value]) => {
    const sortedValue = value.split(' ').sort().join(' ')
    Object.assign(acc, {
      [sortedValue]: key,
    })
    return acc
  },
  {},
)
