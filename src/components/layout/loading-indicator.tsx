import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingIndicator = () => {

    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
            <ActivityIndicator size={'large'} color={theme.text.primary} />
        </View>
    )
}

export default LoadingIndicator

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
})