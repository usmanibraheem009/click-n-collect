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



//////////////////////////////////////////////////////////////

// import { semanticColors } from "./types";

// export const lightSemanticColors: semanticColors = {
//     background: {
//         primary: '#F9F9F9',
//         secondary: '#',
//         tertiary: '#',
//     },
//     text: {
//         primary: '#0000',
//         secondary: '#F31D1D',
//         tertiary: '#4DB947',
//         disabled: '#888888',
//         inverse: '#ffff'
//     },
//     surface: {
//         primary: '#4DB947',
//         secondary: '#E8EAE8',
//         tertiary: '#FA1228',
//     },
//     border: {
//         primary: '#',
//         secondary: '#',
//         tertiary: '#'
//     }
// };

// export const darkSemanticColors: semanticColors = {
//     background: {
//         primary: '#F9F9F9',
//         secondary: '#F2F2F2',
//         tertiary: '#ECECEC',
//     },
//     text: {
//         primary: '#ffff ',
//         secondary: '#F31D1D',
//         tertiary: '#4DB947',
//         disabled: '#888888',
//         inverse: '#ffff'
//     },
//     surface: {
//         primary: '#4DB947',
//         secondary: '#ffff',
//         tertiary: '#FA1228',
//     },
//     border: {
//         primary: '#',
//         secondary: '#',
//         tertiary: '#'
//     }
// };

// export interface themeColors extends semanticColors {
//     primary: string,
//     secondary: string,
//     neutral: string,
//     success: string,
//     warning: string,
//     error: string
// }