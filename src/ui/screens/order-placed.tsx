import Screen from '@/src/components/layout/screen'
import ScreenFooter from '@/src/components/layout/screen-footer'
import { useTheme } from '@/src/hooks/useTheme'
import { clearCart } from '@/src/redux/slices/cartSlice'
import { clearOrderSummary, placeOrder } from '@/src/redux/slices/orderSlice'
import { AppDispatch } from '@/src/redux/store/myStore'
import { mS } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

const OrderPlaced = () => {

    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(placeOrder());
        dispatch(clearCart());
    }, []);

    const handleContinue = () => {
        dispatch(clearOrderSummary());
        router.replace('/(tabs)');
    }

    return (
        <Screen>
            <View style={styles.container}>
                <Ionicons name='checkmark-circle-outline' size={mS(40)} color={theme.surface.primary} />
                <Text style={[styles.titleText, { color: theme.text.primary }]}>Your order is confirmed!</Text>
                <Text style={[styles.subtitleText, { color: theme.text.primary }]}>Your order has been placed successfully.</Text>
                <Text style={[styles.subtitleText, { color: theme.text.primary }]}>You'll receive a confirmation email shortly.</Text>
            </View>

            <ScreenFooter buttonText='Continue shopping' onButtonPress={handleContinue} />
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
    titleText: {
        fontSize: mS(20),
        fontFamily: 'medium'
    },
    subtitleText: {
        fontSize: mS(16),
        fontWeight: '400'
    },
})