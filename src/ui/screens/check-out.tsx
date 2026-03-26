import ScreenHeader from '@/src/components/layout/screen-header'
import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const CheckOutScreen = () => {
    const {subTotal, total, shippingFee} = useLocalSearchParams();

  return (
   <ScreenWrapper>
    <ScreenHeader backArrow title='Checkout' backgroundColor='white' />

    <Text style={styles.titleText}>Shipping Address</Text>

    <View style={styles.addressContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Jane Doe</Text>
            <Pressable>
                
            </Pressable>
        </View>
    </View>
   </ScreenWrapper>
  )
}

export default CheckOutScreen

const styles = StyleSheet.create({
    titleText: {
        fontSize: 16,
        fontWeight: 500,
    },
    addressContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        height: 'auto',
        marginVertical: 20
    }
})