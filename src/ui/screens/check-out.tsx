import LoadingIndicator from '@/src/components/layout/loading-indicator'
import Screen from '@/src/components/layout/screen'
import ScreenFooter from '@/src/components/layout/screen-footer'
import ScreenHeader from '@/src/components/layout/screen-header'
import InputTab from '@/src/components/premitives/Input-tab'
import { useTheme } from '@/src/hooks/useTheme'
import { deleteAddress, fetchAddresses } from '@/src/redux/slices/addressSlice'
import { setOrderAddress } from '@/src/redux/slices/orderSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const CheckOutScreen = () => {
    const { theme } = useTheme();
    const { addressList } = useSelector((state: RootState) => state.addressreducer);
    console.log("address list: ", addressList);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchAddresses()).finally(() => setLoading(false));
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


    const handlePressed = () => {
        if (!selectedId) {
            Alert.alert('Warning', 'Address is not selected yet')
            return null;
        }

        const selectedAddress = addressList.find((a: any) => a.id === selectedId);
        dispatch(setOrderAddress(selectedAddress));
        router.push('/screens/shipping-screen');
    }

    if (loading) {
        return (
            <LoadingIndicator />
        )
    }

    return (
        <>
            <Screen paddingHorizontal={mVs(20)}>
                <ScreenHeader backArrow title='Checkout' />

                <Text style={[styles.titleText, { color: theme.text.primary }]}>Shipping Address</Text>

                <FlatList data={addressList} keyExtractor={(item) => item.id.toString()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: mVs(20) }}
                    renderItem={({ item }) => {
                        const isSelected = selectedId === item.id;
                        return (
                            <Pressable style={[styles.addressContainer, { borderColor: isSelected ? theme.border.primary : theme.border.secondary, }]} onPress={() => { setSelectedId(item.id) }}>
                                {isSelected && (
                                    <View style={[styles.checkmark, { backgroundColor: theme.surface.primary }]}>
                                        <Ionicons name='checkmark' size={mS(14)} color='#fff' />
                                    </View>
                                )}
                                <Text style={[styles.heading, { color: theme.text.primary }]}>{item.type}</Text>
                                <Text style={[styles.name, { color: theme.text.primary }]}>{item.yourName ?? 'N/A'}</Text>
                                <Text style={[styles.body, { color: theme.text.secondary }]}>{item.streetAddress}, {item.city}, {item.state}, {item.country}</Text>
                                <View style={styles.deleteContainer}>
                                    <Text style={[styles.body, { color: theme.text.secondary }]}>{item.phoneNumber}</Text>
                                    <Ionicons name='trash' color={theme.text.secondary} size={mS(24)} onPress={() => handleDelete(item.id)} />
                                </View>
                            </Pressable>
                        )
                    }} />

                <TouchableOpacity style={{ marginBottom: mVs(20) }} onPress={() => { router.push('/screens/add-address') }}>
                    <InputTab editable={false} placeholder='+ Add New Address' centerAlign={true} />
                </TouchableOpacity>

            </Screen>

            <ScreenFooter buttonText='Continue to Shipping' onButtonPress={handlePressed} />
        </>
    )
}

export default CheckOutScreen

const styles = StyleSheet.create({
    titleText: {
        fontSize: mS(16),
        fontFamily: 'bold',
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
    }
})