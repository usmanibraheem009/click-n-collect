import Screen from '@/src/components/layout/screen'
import ScreenFooter from '@/src/components/layout/screen-footer'
import { useTheme } from '@/src/hooks/useTheme'
import { clearOrderSummary } from '@/src/redux/slices/orderSlice'
import { AppDispatch } from '@/src/redux/store/myStore'
import { mS } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

const OrderPlaced = () => {

    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Screen>
            <View style={styles.container}>
                <Ionicons name='checkmark-circle-outline' size={mS(40)} color={theme.surface.primary} />
                <Text style={[styles.text, { color: theme.text.primary }]}>Your order is confirmed!</Text>
            </View>

            <ScreenFooter buttonText='Continue shopping' onButtonPress={() => { router.replace('/(tabs)'); dispatch(clearOrderSummary()) }} />
        </Screen>
    )
}

export default OrderPlaced

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: mS(20),
        fontFamily: 'medium'
    }
})