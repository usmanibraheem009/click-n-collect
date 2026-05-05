import LoadingIndicator from '@/src/components/layout/loading-indicator';
import Screen from '@/src/components/layout/screen';
import ScreenFooter from '@/src/components/layout/screen-footer';
import ScreenHeader from '@/src/components/layout/screen-header';
import { useTheme } from '@/src/hooks/useTheme';
import { setPaymentMethod } from '@/src/redux/slices/orderSlice';
import { deletePaymentMethod, fetchPaymentMethods } from '@/src/redux/slices/paymentSlice';
import { showSnackbar } from '@/src/redux/slices/snackbarSlice';
import { AppDispatch, RootState } from '@/src/redux/store/myStore';
import { mS, mVs } from '@/src/utils/scale';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const PaymentScreen = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { paymentList, loading } = useSelector((state: RootState) => state.paymentreducer);
    console.log('payment list: ', paymentList);
    const orderSummary = useSelector((state: RootState) => state.orderreducer);
    console.log('order Summary: ', orderSummary);

    const { subTotal, shippingFee } = useSelector((state: RootState) => state.orderreducer);
    const tax = subTotal * 0.10;
    const grandTotal = subTotal + shippingFee + tax;

    useEffect(() => {
        dispatch(fetchPaymentMethods());
    }, []);

    const getIcon = (type: string) => {
        if (type === 'Card') return 'card-outline';
        if (type === 'JazzCash') return 'phone-portrait-outline';
        return 'cash-outline';
    };

    const getLabel = (item: any) => {
        if (item.type === 'Card') return `**** **** **** ${item.cardNumber}`;
        if (item.type === 'JazzCash') return `JazzCash — ${item.mobileNumber}`;
        return 'Cash on Delivery';
    };

    const getSubtitle = (item: any) => {
        if (item.type === 'Card') return `Expires at ${item.cardExpiry}`;
        if (item.type === 'JazzCash') return item.accountTitle;
        return 'Pay when order arrives';
    };

    const handleDelete = (methodId: any) => {
        Alert.alert('Warning', 'Are you sure you want to delete this method', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(deletePaymentMethod(methodId));
                    dispatch(showSnackbar({ message: 'Payment method deleted', type: 'success' }));
                }
            }
        ]);
    }

    const handlePressed = () => {
        if (!selectedId) {
            Alert.alert('Warning', 'No payment method is selected');
            return null;
        };
        const selected = paymentList.find((m) => m.id === selectedId);
        dispatch(setPaymentMethod(selected));
        router.replace('/screens/order-placed')
    };

    return (
        <>
            <Screen paddingHorizontal={mS(20)}>
                <ScreenHeader backArrow title='Payment' />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={[styles.sectionLabel, { color: theme.text.disabled }]}>PAYMENT METHOD</Text>

                    {loading ? (
                        <LoadingIndicator />
                    ) : (
                        paymentList.map((item) => {
                            const isSelected = selectedId === item.id;
                            return (
                                <Pressable key={item.id} style={[styles.paymentCard,
                                {
                                    borderColor: isSelected ? theme.surface.primary : theme.border.primary,
                                    backgroundColor: isSelected ? theme.surface.tertiary : theme.surface.secondary,
                                }
                                ]}
                                    onPress={() => setSelectedId(item.id)}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: isSelected ? theme.surface.primary : theme.background.primary }]}>
                                        <Ionicons name={getIcon(item.type) as any} size={mS(22)} color={isSelected ? '#fff' : theme.text.secondary} />
                                    </View>
                                    <View style={styles.cardInfo}>
                                        <Text style={[styles.cardTitle, { color: theme.text.primary }]}>{getLabel(item)}</Text>
                                        <Text style={[styles.cardSubtitle, { color: theme.text.secondary }]}>{getSubtitle(item)}</Text>
                                    </View>
                                    {isSelected
                                        ? <Ionicons name='checkmark-circle' size={mS(22)} color={theme.surface.primary} />
                                        : <Pressable onPress={() => handleDelete(item.id)}>
                                            <Ionicons name='trash-outline' size={mS(24)} color={theme.text.disabled} />
                                        </Pressable>
                                    }
                                </Pressable>
                            );
                        })
                    )}

                    <Pressable
                        style={[styles.addPayment, { borderColor: theme.border.primary }]}
                        onPress={() => router.push('/screens/add-payment-method')}
                    >
                        <Ionicons name='add-circle-outline' size={mS(20)} color={theme.surface.primary} />
                        <Text style={[styles.addPaymentText, { color: theme.surface.primary }]}>Add Payment Method</Text>
                    </Pressable>

                    {/* Order Summary — same as before */}
                    <View style={[styles.divider, { backgroundColor: theme.border.primary }]} />
                    <Text style={[styles.sectionLabel, { color: theme.text.disabled }]}>ORDER SUMMARY</Text>
                    <View style={[styles.summaryCard, { backgroundColor: theme.surface.secondary }]}>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.text.secondary }]}>Subtotal</Text>
                            <Text style={[styles.summaryValue, { color: theme.text.primary }]}>${subTotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.text.secondary }]}>Shipping</Text>
                            <Text style={[styles.summaryValue, { color: theme.text.primary }]}>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.text.secondary }]}>Tax (10%)</Text>
                            <Text style={[styles.summaryValue, { color: theme.text.primary }]}>${tax.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.divider, { backgroundColor: theme.border.primary }]} />
                        <View style={styles.summaryRow}>
                            <Text style={[styles.totalLabel, { color: theme.text.primary }]}>Total</Text>
                            <Text style={[styles.totalValue, { color: theme.surface.primary }]}>${grandTotal.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={{ height: mVs(100) }} />
                </ScrollView>
            </Screen>

            <ScreenFooter
                buttonText={`Pay $${grandTotal.toFixed(2)}`}
                onButtonPress={handlePressed}
            />
        </>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    sectionLabel: {
        fontSize: mS(11),
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: mVs(12),
        marginTop: mVs(8),
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: mS(16),
        borderRadius: mS(16),
        borderWidth: 1.5,
        marginBottom: mVs(10),
        gap: mS(12),
    },
    iconBox: {
        height: mS(44),
        width: mS(44),
        borderRadius: mS(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInfo: {
        flex: 1,
        gap: mVs(3),
    },
    cardTitle: {
        fontSize: mS(14),
        fontFamily: 'Inter_600SemiBold',
    },
    cardSubtitle: {
        fontSize: mS(12),
        fontFamily: 'Inter_400Regular',
    },
    addPayment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: mS(14),
        borderRadius: mS(16),
        borderWidth: 1.5,
        borderStyle: 'dashed',
        gap: mS(8),
        marginBottom: mVs(10),
    },
    addPaymentText: {
        fontSize: mS(14),
        fontFamily: 'Inter_600SemiBold',
    },
    divider: {
        height: 1,
        marginVertical: mVs(16),
    },
    summaryCard: {
        borderRadius: mS(16),
        padding: mS(16),
        gap: mVs(12),
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: mS(14),
        fontFamily: 'Inter_400Regular',
    },
    summaryValue: {
        fontSize: mS(14),
        fontFamily: 'Inter_600SemiBold',
    },
    totalLabel: {
        fontSize: mS(16),
        fontFamily: 'Inter_700Bold',
    },
    totalValue: {
        fontSize: mS(18),
        fontFamily: 'Inter_700Bold',
    },
})