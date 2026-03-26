import { semanticColors } from "./types";

export const lightSemanticColors: semanticColors = {
    background: {
        primary: '#F9F9F9',
        secondary: '#',
        tertiary: '#',
    },
    text: {
        primary: '#0000',
        secondary: '#9B9B9B',
        tertiary: '#',
        disabled: '#',
        inverse: '#'
    },
    surface: {
        primary: '#DB3022',
        secondary: '#ffff',
        tertiary: '#',
    },
    border: {
        primary: '#',
        secondary: '#',
        tertiary: '#'
    }
};

export const darkSemanticColors: semanticColors = {
    background: {
        primary: '#F9F9F9',
        secondary: '#',
        tertiary: '#',
    },
    text: {
        primary: '#00000',
        secondary: '#9B9B9B',
        tertiary: '#',
        disabled: '#',
        inverse: '#'
    },
    surface: {
        primary: '#DB3022',
        secondary: '#ffff',
        tertiary: '#',
    },
    border: {
        primary: '#',
        secondary: '#',
        tertiary: '#'
    }
};

export interface themeColors extends semanticColors {
    primary: string,
    secondary: string,
    neutral: string,
    success: string,
    warning: string,
    error: string
}