export type ThemeMode = 'light' | 'dark' | 'system';

export interface ColorScale{
    50: string,
    100: string,
    200: string,
    300: string,
    400: string,
    500: string,
    600: string,
    700: string,
    800: string,
    900: string,
    950: string,
};

export interface semanticColors {
    background: {
        primary: string,
        secondary: string,
        tertiary: String,
    },
    text: {
        primary: string,
        secondary: string,
        tertiary: string,
        disabled: string,
        inverse: string
    },
    surface: {
        primary: string,
        secondary: string,
        tertiary: string,
    },
    border: {
        primary: string,
        secondary: string,
        tertiary: string
    }

}

export interface ThemeColors extends semanticColors {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  option: ColorScale;
}

export interface TextStyle{
    fontSize: number,
    letterSpacing: number,
    lineHeight: number,
    fontFamily: string,
    fontWeight: FontWeight
};

export interface Typography{
    displayLarge: TextStyle,
    displayMedium: TextStyle,
    displaySmall: TextStyle,
    headlineLarge: TextStyle,
    headlineMedium: TextStyle,
    headlineSmall: TextStyle,
    titleLarge: TextStyle,
    titleMedium: TextStyle,
    titleSemibold: TextStyle,
    titleSmall: TextStyle,
    bodyLarge: TextStyle,
    bodyMedium: TextStyle,
    bodySmall: TextStyle,
    labelLarge: TextStyle,
    labelMedium: TextStyle,
    labelSmall: TextStyle,
    actionLarge: TextStyle,
};

export type FontWeight = 
| 'regular'
| 'semibold'
| 'bold'
| 'black'