import { MD3LightTheme } from 'react-native-paper';

export const paperTheme = {
    ...MD3LightTheme,

    roundness: 8, // affects TextInput & Button corners

    colors: {
        ...MD3LightTheme.colors,

        primary: '#4F46E5',
        secondary: '#22C55E',
        error: '#EF4444',

        background: '#FFFFFF',
        surface: '#FFFFFF',

        // TextInput specific
        outline: '#D1D5DB',        // border color (outlined)
        onSurfaceVariant: '#6B7280', // label & placeholder
    },

    fonts: {
        ...MD3LightTheme.fonts,
        bodyLarge: {
            fontFamily: 'System',
            fontSize: 16,
        },
    },
};
