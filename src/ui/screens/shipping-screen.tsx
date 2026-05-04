import Screen from '@/src/components/layout/screen'
import ScreenHeader from '@/src/components/layout/screen-header'
import { useTheme } from '@/src/hooks/useTheme'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

const shipmentMethods = [
    { id: 1, title: 'Standard Delivery', numberOfDays: '5-6 Business Days', price: '15' },
    { id: 2, title: 'Express Delivery', numberOfDays: '2-3 Business Days', price: '25' },
    { id: 3, title: 'Next Day Delivery', numberOfDays: 'Tomorrow', price: '40' },
]

const ShippingScreen = () => {

    const { theme } = useTheme();

    return (
        <Screen paddingHorizontal={mVs(20)}>
            <ScreenHeader backArrow title='Shipping method' />

            <FlatList data={shipmentMethods} renderItem={({ item }) => (
                <Pressable style={[styles.container, { borderColor: theme.border.secondary }]}>
                    <Ionicons name='cube-outline' size={mVs(40)} color={theme.text.secondary} />
                    <View>
                        <Text style={[styles.title, { color: theme.text.primary }]}>{item.title}</Text>
                        <Text style={[styles.subtitle, { color: theme.text.secondary }]}>{item.numberOfDays}</Text>
                    </View>
                    <Text style={[styles.price, { color: theme.text.primary }]}>${item.price}</Text>

                </Pressable>
            )} />

        </Screen>
    )
}

export default ShippingScreen

const styles = StyleSheet.create({
    container: {
        padding: mS(20),
        borderWidth: 1.5,
        borderRadius: mS(10),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: mS(24),
        fontFamily: 'NotoSerif_700Bold',
    },
    subtitle: {

    },
    price: {

    }
})