import Screen from '@/src/components/layout/screen'
import ScreenFooter from '@/src/components/layout/screen-footer'
import ScreenHeader from '@/src/components/layout/screen-header'
import { useTheme } from '@/src/hooks/useTheme'
import { setShippingMethod } from '@/src/redux/slices/orderSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const shipmentMethods = [
    { id: 1, title: 'Standard Delivery', numberOfDays: '5-6 Business Days', price: '15', icon: 'cube-outline' },
    { id: 2, title: 'Express Delivery', numberOfDays: '2-3 Business Days', price: '25', icon: 'rocket-outline' },
    { id: 3, title: 'Next Day Delivery', numberOfDays: 'Tomorrow', price: '40', icon: 'flash-outline' },
]

const ShippingScreen = () => {

    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedAddress = useSelector((state: RootState) => state.orderreducer.address);

    useEffect(() => {
        if (!selectedAddress) {
            router.replace('/screens/check-out');
        }
    }, [selectedAddress]);

    if (!selectedAddress) return null;

    const handlePressed = () => {
        if (!selectedId) {
            Alert.alert('Warning', 'No shipment method is selected!')
            return null;
        };

        const selectedMethod = shipmentMethods.find((m) => m.id === selectedId);
        dispatch(setShippingMethod(selectedMethod));
        router.push('/screens/payment-screen');
    }

    return (
        <>
            <Screen paddingHorizontal={mS(20)}>
                <ScreenHeader backArrow title='Shipping Method' />

                <FlatList
                    data={shipmentMethods}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                        const isSelected = selectedId === item.id;
                        return (
                            <Pressable
                                style={[styles.methodCard, {
                                    borderColor: isSelected ? theme.surface.primary : theme.border.primary,
                                    backgroundColor: isSelected ? theme.surface.tertiary : 'transparent',
                                }
                                ]} onPress={() => setSelectedId(item.id)}>
                                <View style={[styles.iconBox, { backgroundColor: isSelected ? theme.surface.primary : theme.surface.secondary }]}>
                                    <Ionicons
                                        name={item.icon as any}
                                        size={mS(22)}
                                        color={isSelected ? '#fff' : theme.text.secondary}
                                    />
                                </View>

                                <View style={styles.methodInfo}>
                                    <Text style={[styles.title, { color: theme.text.primary }]}>{item.title}</Text>
                                    <Text style={[styles.subtitle, { color: theme.text.secondary }]}>{item.numberOfDays}</Text>
                                </View>

                                <View style={styles.rightSection}>
                                    <Text style={[styles.price, { color: isSelected ? theme.surface.primary : theme.text.primary }]}>
                                        ${item.price}
                                    </Text>
                                    {isSelected && (
                                        <Ionicons name='checkmark-circle' size={mS(18)} color={theme.surface.primary} />
                                    )}
                                </View>
                            </Pressable>
                        )
                    }}
                />

                <View style={[styles.divider, { backgroundColor: theme.border.primary }]} />

                <Text style={[styles.sectionLabel, { color: theme.text.disabled }]}>DELIVERING TO</Text>
                <Pressable style={[styles.addressContainer, { borderColor: theme.border.primary, backgroundColor: theme.surface.secondary }]}
                    onPress={() => router.back()}>
                    <View style={styles.addressTop}>
                        <View style={styles.addressLeft}>
                            <Ionicons name='location-outline' size={mS(18)} color={theme.surface.primary} />
                            <Text style={[styles.heading, { color: theme.text.primary }]}>{selectedAddress.type}</Text>
                        </View>
                        <Text style={[styles.changeText, { color: theme.surface.primary }]}>Change</Text>
                    </View>
                    <Text style={[styles.name, { color: theme.text.primary }]}>{selectedAddress.yourName}</Text>
                    <Text style={[styles.body, { color: theme.text.secondary }]}>
                        {selectedAddress.streetAddress}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country}
                    </Text>
                    {selectedAddress.phoneNumber && (
                        <Text style={[styles.body, { color: theme.text.secondary }]}>{selectedAddress.phoneNumber}</Text>
                    )}
                </Pressable>

            </Screen>
            <ScreenFooter
                buttonText='Continue to Payment'
                onButtonPress={handlePressed}
            />
        </>
    )
}

export default ShippingScreen

const styles = StyleSheet.create({
    methodCard: {
        padding: mS(16),
        borderWidth: 1.5,
        borderRadius: mS(16),
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: mVs(8),
        gap: mS(12),
    },
    iconBox: {
        height: mS(44),
        width: mS(44),
        borderRadius: mS(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    methodInfo: {
        flex: 1,
        gap: mVs(4),
    },
    rightSection: {
        alignItems: 'flex-end',
        gap: mVs(4),
    },
    title: {
        fontSize: mS(15),
        fontFamily: 'semiBold',
    },
    subtitle: {
        fontSize: mS(12),
        fontFamily: 'regular',
    },
    price: {
        fontSize: mS(16),
        fontFamily: 'bold',
    },
    divider: {
        height: 1,
        marginVertical: mVs(16),
    },
    sectionLabel: {
        fontSize: mS(11),
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: mVs(8),
    },
    addressContainer: {
        borderRadius: mS(16),
        padding: mS(16),
        borderWidth: 1.5,
        gap: mVs(6),
    },
    addressTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addressLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: mS(6),
    },
    heading: {
        fontSize: mS(16),
        fontFamily: 'bold',
    },
    body: {
        fontSize: mS(13),
        fontWeight: '500',
        lineHeight: mVs(20),
    },
    changeText: {
        fontSize: mS(13),
        fontWeight: '600',
    },
    name: {
        fontSize: mS(18),
        fontFamily: 'medium'
    }
})