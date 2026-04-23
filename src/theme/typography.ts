import { FontWeight, Typography } from "./types";

export const fontFamilies = {
    regular: 'Bogle-Regular',
    semibold: 'Bogle-Semibold',
    bold: 'Bogle-Bold',
    black: 'Bogle-Black',
} as const;

export const getFontFamily = (weight: FontWeight): string => {
    return fontFamilies[weight] || fontFamilies.regular
};

export const typography: Typography = {
    displayLarge: {
        fontSize: 42,
        fontFamily: fontFamilies.bold,
        fontWeight: 'black',
        lineHeight: 64,
        letterSpacing: 0
    },
    titleLarge: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0,
        lineHeight: 28,
        fontFamily: fontFamilies.bold
    },
    titleMedium: {
        fontSize: 14,
        fontWeight: 'regular',
        letterSpacing: 0,
        lineHeight: 24,
        fontFamily: fontFamilies.regular
    },
    titleSemibold: {
        fontSize: 13,
        fontWeight: 'semibold',
        letterSpacing: -0.5,
        lineHeight: 20,
        fontFamily: fontFamilies.semibold
    },
    titleSmall: {
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 0,
        lineHeight: 20,
        fontFamily: fontFamilies.bold
    },
    headlineLarge: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "black"
    },
    displayMedium: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    displaySmall: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    headlineMedium: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    headlineSmall: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    bodyLarge: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    bodyMedium: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    bodySmall: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    labelLarge: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    labelMedium: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    labelSmall: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    },
    actionLarge: {
        fontSize: 0,
        letterSpacing: 0,
        lineHeight: 0,
        fontFamily: "",
        fontWeight: "regular"
    }
}