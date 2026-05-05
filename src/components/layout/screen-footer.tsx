import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SimpleButton from '../premitives/simple-button';

interface footerProps {
    onButtonPress: () => void,
    buttonText: string,
}

const ScreenFooter = ({ onButtonPress, buttonText }: footerProps) => {

    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background.primary, borderTopColor: theme.border.secondary }]}>
            <View style={{ flex: 8 }}>
                <SimpleButton btnText={buttonText} onPress={onButtonPress} />
            </View>
        </View>
    )
}

export default ScreenFooter

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        padding: 16,
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
})