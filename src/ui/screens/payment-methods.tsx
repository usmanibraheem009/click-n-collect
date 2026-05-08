import Screen from '@/src/components/layout/screen'
import ScreenHeader from '@/src/components/layout/screen-header'
import { useTheme } from '@/src/hooks/useTheme'
import { deletePaymentMethod, fetchPaymentMethods } from '@/src/redux/slices/paymentSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const PaymentMethods = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();
    const paymentList = useSelector((state: RootState) => state.paymentreducer.paymentList ?? []);

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
    };

    return (
        <Screen paddingHorizontal={mS(20)}>
            <ScreenHeader backArrow title='Payment methods' />

            <FlatList data={paymentList} renderItem={({ item }) => (
                <Pressable key={item.id} style={[styles.paymentCard, { borderColor: theme.border.primary, backgroundColor: theme.surface.secondary }]} >
                    <View style={[styles.iconBox, { backgroundColor: theme.background.primary }]}>
                        <Ionicons name={getIcon(item.type) as any} size={mS(22)} color={theme.text.secondary} />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={[styles.cardTitle, { color: theme.text.primary }]}>{getLabel(item)}</Text>
                        <Text style={[styles.cardSubtitle, { color: theme.text.secondary }]}>{getSubtitle(item)}</Text>
                    </View>
                    <Pressable onPress={() => handleDelete(item.id)}>
                        <Ionicons name='trash-outline' size={mS(24)} color={theme.text.disabled} />
                    </Pressable>
                </Pressable>
            )} />

            <Pressable style={[styles.addPayment, { borderColor: theme.border.primary }]} onPress={() => router.push('/screens/add-payment-method')} >
                <Ionicons name='add-circle-outline' size={mS(20)} color={theme.surface.primary} />
                <Text style={[styles.addPaymentText, { color: theme.surface.primary }]}>Add Payment Method</Text>
            </Pressable>

        </Screen>
    )
}

export default PaymentMethods

const styles = StyleSheet.create({
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
})