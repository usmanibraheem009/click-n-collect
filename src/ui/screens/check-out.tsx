import Screen from '@/src/components/layout/screen'
import ScreenHeader from '@/src/components/layout/screen-header'
import InputTab from '@/src/components/premitives/Input-tab'
import SimpleButton from '@/src/components/premitives/simple-button'
import { useTheme } from '@/src/hooks/useTheme'
import { RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

const CheckOutScreen = () => {
    const { theme } = useTheme();
    const { addressList } = useSelector((state: RootState) => state.addressreducer);
    console.log(addressList);

    return (
        <Screen paddingHorizontal={mVs(20)}>
            <ScreenHeader backArrow title='Checkout' />

            <Text style={[styles.titleText, { color: theme.text.primary }]}>Shipping Address</Text>

            <FlatList data={addressList} keyExtractor={(item) => item.id.toString()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: mVs(20) }}
                renderItem={({ item }) => (
                    <Pressable style={[styles.addressContainer, { borderColor: theme.border.secondary }]}>
                        <Text style={[styles.heading, { color: theme.text.primary }]}>{item.type}</Text>
                        <Text style={[styles.body, { color: theme.text.secondary }]}>{item.streetAddress}, {item.city}, {item.state}, {item.country}</Text>
                        <Text style={[styles.body, { color: theme.text.secondary }]}>{item.phoneNumber}</Text>
                    </Pressable>
                )} />

            <TouchableOpacity style={{ marginBottom: mVs(20) }} onPress={() => { router.push('/screens/add-address') }}>
                <InputTab editable={false} placeholder='+ Add New Address' centerAlign={true} />
            </TouchableOpacity>

            <SimpleButton btnText='Proceed to Shipping' onPress={() => router.push('/screens/shipping-screen')} />
        </Screen>
    )
}

export default CheckOutScreen

const styles = StyleSheet.create({
    titleText: {
        fontSize: mS(16),
        fontFamily: 'NotoSerif_700Bold',
    },
    addressContainer: {
        borderRadius: mS(20),
        width: '100%',
        justifyContent: 'center',
        padding: mS(20),
        height: 'auto',
        marginVertical: mVs(20),
        borderWidth: 1.5,
        gap: mS(5)
    },
    heading: {
        fontSize: mS(24),
        fontFamily: 'NotoSerif_700Bold',
    },
    name: {
        fontSize: mS(20),
        fontWeight: '500',
    },
    body: {
        fontSize: mS(18),
        fontWeight: '500',
    },
})