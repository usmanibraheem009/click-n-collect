import Screen from '@/src/components/layout/screen'
import ScreenHeader from '@/src/components/layout/screen-header'
import InputTab from '@/src/components/premitives/Input-tab'
import { useTheme } from '@/src/hooks/useTheme'
import { deleteAddress, fetchAddresses } from '@/src/redux/slices/addressSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const ShippingAddresses = () => {

    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const addressList = useSelector((state: RootState) => state.addressreducer.addressList ?? []);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, []);

    const handleDelete = (addressId: string) => {
        Alert.alert('Warning', 'Do you really want to delete this address?', [
            { text: 'cancel', style: 'cancel' },
            {
                text: "Yes", style: 'destructive', onPress: () => {
                    dispatch(deleteAddress(addressId));
                    dispatch(showSnackbar({ message: 'Address deleted successfully', type: 'success' }));
                }
            }
        ])
    };


    return (
        <Screen paddingHorizontal={mS(20)}>

            <ScreenHeader backArrow title='shipping address' />
            <FlatList data={addressList} keyExtractor={(item) => item.id.toString()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: mVs(20) }}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.addressContainer, { borderColor: theme.border.secondary, }]}>
                            <Text style={[styles.heading, { color: theme.text.primary }]}>{item.type}</Text>
                            <Text style={[styles.name, { color: theme.text.primary }]}>{item.yourName ?? 'N/A'}</Text>
                            <Text style={[styles.body, { color: theme.text.secondary }]}>{item.streetAddress}, {item.city}, {item.state}, {item.country}</Text>
                            <View style={styles.deleteContainer}>
                                <Text style={[styles.body, { color: theme.text.secondary }]}>{item.phoneNumber}</Text>
                                <Ionicons name='trash' color={theme.text.secondary} size={mS(24)} onPress={() => handleDelete(item.id)} />
                            </View>
                        </View>
                    )
                }} />

            <TouchableOpacity style={[styles.addAddress, { borderColor: theme.border.primary }]} onPress={() => { router.push('/screens/add-address') }}>
                <InputTab editable={false} placeholder='+ Add New Address' centerAlign={true} />
            </TouchableOpacity>
        </Screen>
    )
}

export default ShippingAddresses

const styles = StyleSheet.create({
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
        fontFamily: 'bold',
    },
    name: {
        fontSize: mS(20),
        fontWeight: '500',
    },
    body: {
        fontSize: mS(18),
        fontWeight: '500',
    },
    checkmark: {
        position: 'absolute',
        top: mVs(12),
        right: mS(12),
        height: mS(24),
        width: mS(24),
        borderRadius: mS(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addAddress: {
        marginBottom: mVs(20),
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderRadius: mS(10)
    }
})