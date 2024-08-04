const ColorsPalette = {
  paleBlue100: '#3d3f40',
  paleBlue200: '#13343b',
  paleCyan100: '#8d9191',
  paleCyan200: '#2d2f2f',
  paleCyan300: '#202222',
  paleCyan400: '#191a1a',
  paleTeal100: '#dfe7e4',
  paleYellow100: '#fcfcf9',
  paleYellow200: '#f3f3ee',
  paleYellow300: '#e8e8e3',
  paleYellow400: '#e8e8e6',
  paleYellow500: '#e0e0dc',
  paleYellow600: '#d9d9d0',
  paleYellow700: '#64645f',
  paleYellow800: '#3d3d3b',
  persimmon100: '#a84b2f',
  red100: '#b4413c',
  rose100: '#ff5459',
  teal100: '#20b8cd',
  teal200: '#21808d'
}

export const Colors = {
  black: '#000',
  gray: '#242026',
  greyLight: '#B8B3BA',
  white: '#fff',
  dark: {
    backgroundColor100: ColorsPalette.paleCyan400,
    backgroundColor200: ColorsPalette.paleCyan300,
    backgroundColor300: ColorsPalette.paleCyan200,
    backgroundSuperColor100: ColorsPalette.paleBlue200,
    backgroundSuperColor200: ColorsPalette.teal100,
    backgroundSuperColor300: ColorsPalette.teal200,
    backgroundSuperAltColor100: ColorsPalette.red100,
    textColor100: ColorsPalette.paleYellow400,
    textColor200: ColorsPalette.paleCyan100
  },
  light: {
    backgroundColor100: ColorsPalette.paleYellow100,
    backgroundColor200: ColorsPalette.paleYellow200,
    backgroundColor300: ColorsPalette.paleYellow300,
    backgroundSuperColor100: ColorsPalette.paleTeal100,
    backgroundSuperColor200: ColorsPalette.teal200,
    backgroundSuperColor300: ColorsPalette.teal100,
    backgroundSuperAltColor100: ColorsPalette.persimmon100,
    textColor100: ColorsPalette.paleBlue200,
    textColor200: ColorsPalette.paleYellow700
  }
}
