import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { icontheme } from '../theme/icontheme';

interface AppIconProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
}

const AppIcon = ({
    name,
    size = icontheme.iconSizes.sm,
    color = icontheme.colors.primary,
    style,
}: AppIconProps) => {
    return <FontAwesome name={name} size={size} color={color} style={style} />;
};

export default AppIcon;
