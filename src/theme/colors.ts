import { semanticColors } from "./types";

export const lightSemanticColors: semanticColors = {
    background: {
        primary: '#FAFAF8',
        secondary: '#FFFF',
        tertiary: '#E5E7EB',
    },
    text: {
        primary: '#111827',
        secondary: '#909090',
        tertiary: '#',
        disabled: '#9E9E9E',
        inverse: '#FF7B7B'
    },
    surface: {
        primary: '#FF6B6B',
        secondary: '#F5F5F3',
        tertiary: '#FFFF',
    },
    border: {
        primary: '#FF6B6B',
        secondary: '#EAEDF2',
        tertiary: '#9ABDF8',
    },
};

export const darkSemanticColors: semanticColors = {
    background: {
        primary: '#0F1319',
        secondary: '#1A1F2B',
        tertiary: '#374151'
    },
    text: {
        primary: '#F9FAFB',
        secondary: '#919191',
        tertiary: '#E8E8E5',
        disabled: '#9E9E9E',
        inverse: '#FF7B7B'
    },
    surface: {
        primary: '#FF6B6B',
        secondary: '#2A2A2A',
        tertiary: '#1E1E1E',
    },
    border: {
        primary: '#FF6B6B',
        secondary: '#282F3D',
        tertiary: '#254A87',
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
