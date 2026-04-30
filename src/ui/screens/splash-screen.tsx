import { useTheme } from '@/src/hooks/useTheme'
import { mVs } from '@/src/utils/scale'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

const SplashScreen = () => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.surface.primary }]}>
            <Image source={require('../../../assets/images/splash-icon.png')} style={styles.image} />
            <ActivityIndicator color='#fff' size={'large'} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: mVs(250),
        width: mVs(250),
        resizeMode: 'contain',
    }
})