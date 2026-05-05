import KeyboardAvoiding from '@/src/components/layout/keyboard-avoiding'
import Screen from '@/src/components/layout/screen'
import ScreenFooter from '@/src/components/layout/screen-footer'
import ScreenHeader from '@/src/components/layout/screen-header'
import InputTab from '@/src/components/premitives/Input-tab'
import { useTheme } from '@/src/hooks/useTheme'
import { addPaymentMethod } from '@/src/redux/slices/paymentSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

type methodType = 'card' | 'cod' | 'jazzcash';

const TABS: { label: string; value: methodType; icon: string }[] = [
    { label: 'Card', value: 'card', icon: 'card-outline' },
    { label: 'JazzCash', value: 'jazzcash', icon: 'phone-portrait-outline' },
    { label: 'COD', value: 'cod', icon: 'cash-outline' },
];

const AddPaymentMethod = () => {

    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const [activeTab, setActiveTab] = useState<methodType>('card');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [accountTitle, setAccountTitle] = useState('');

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, '').slice(0, 16);
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (text: string) => {
        const cleaned = text.replace(/\D/g, '').slice(0, 4);
        if (cleaned.length >= 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        return cleaned;
    };

    const handleSave = async () => {
        if (activeTab === 'card') {
            if (!cardHolderName || !cardNumber || !expiry) return;

            await dispatch(addPaymentMethod({
                type: 'Card',
                cardHolderName,
                cardNumber: cardNumber.replace(/\s/g, '').slice(-4),
                cardExpiry: expiry
            }))
        } else if (activeTab === 'jazzcash') {
            if (!accountTitle || !mobileNumber) return;

            await dispatch(addPaymentMethod({
                type: 'JazzCash',
                accountTitle,
                mobileNumber,
            }));
        } else {
            dispatch(addPaymentMethod({ type: 'Cash on Delivery' }));
        }
        dispatch(showSnackbar({ message: 'Method added successfully', type: 'success' }))
        router.back();
    }

    return (
        <KeyboardAvoiding paddingHorizontal={mVs(20)}>
            <ScreenHeader backArrow title='Add Payment Method' />

            <View style={[styles.tabRow, { backgroundColor: theme.surface.secondary }]}>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                        <Pressable key={tab.value} style={[styles.tab, isActive && { backgroundColor: theme.surface.primary }]}
                            onPress={() => setActiveTab(tab.value)}>
                            <Ionicons name={tab.icon as any} size={mS(16)} color={isActive ? '#fff' : theme.text.secondary} />
                            <Text style={[styles.tabText, { color: isActive ? '#fff' : theme.text.secondary }]}> {tab.label}</Text>
                        </Pressable>
                    );
                })}
            </View>

            {activeTab === 'card' && (
                <KeyboardAvoiding>
                    <Text style={[styles.labelText, { color: theme.text.primary }]}>CARD HOLDER NAME</Text>
                    <InputTab placeholder='Card holder name' value={cardHolderName} onChangeText={setCardHolderName} />

                    <Text style={[styles.labelText, { color: theme.text.primary }]}>CARD NUMBER</Text>
                    <InputTab placeholder='e.g: 1234 5678 9012 3456' value={cardNumber} onChangeText={(t) => setCardNumber(formatCardNumber(t))} keyboardType='numeric' maxLength={19} />

                    <Text style={[styles.labelText, { color: theme.text.primary }]}>CARD EXPIRY</Text>
                    <InputTab placeholder='MM/YY' value={expiry} onChangeText={(t) => setExpiry(formatExpiry(t))} keyboardType='numeric' maxLength={5} />
                </KeyboardAvoiding>
            )}


            {activeTab === 'jazzcash' && (
                <KeyboardAvoiding>
                    <Text style={[styles.labelText, { color: theme.text.primary }]}>ACCOUNT TITLE</Text>
                    <InputTab placeholder='Account title' value={accountTitle} onChangeText={setAccountTitle} />
                    <Text style={[styles.labelText, { color: theme.text.primary }]}>MOBILE NUMBER</Text>
                    <InputTab placeholder='e.g: 03012345678' value={mobileNumber} onChangeText={setMobileNumber} keyboardType='phone-pad' maxLength={11} />
                </KeyboardAvoiding>
            )}

            {activeTab === 'cod' && (
                <Screen>
                    <View style={styles.codContainer}>
                        <Ionicons name='cash-outline' size={mS(50)} color={theme.surface.primary} />
                        <Text style={[styles.codTitle, { color: theme.text.primary }]}>Cash on Delivery</Text>
                        <Text style={[styles.codSubtitle, { color: theme.text.secondary }]}>
                            Pay with cash when your order arrives at your doorstep.
                        </Text>
                    </View>
                </Screen>
            )}

            <ScreenFooter buttonText='Save payment method' onButtonPress={handleSave} />

        </KeyboardAvoiding>
    )
}

export default AddPaymentMethod

const styles = StyleSheet.create({
    tabRow: {
        flexDirection: 'row',
        borderRadius: mS(12),
        padding: mS(4),
        marginBottom: mVs(20),
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: mVs(10),
        borderRadius: mS(10),
        gap: mS(6),
    },
    tabText: {
        fontSize: mS(12),
        fontFamily: 'semiBold',
    },
    labelText: {
        fontSize: mS(16),
        fontFamily: 'medium',
        marginTop: mVs(13),
        marginBottom: mVs(5),
    },
    codContainer: {
        alignItems: 'center',
        paddingVertical: mVs(30),
        gap: mVs(12),
    },
    codTitle: {
        fontSize: mS(20),
        fontFamily: 'Inter_700Bold',
    },
    codSubtitle: {
        fontSize: mS(13),
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        lineHeight: mVs(20),
        paddingHorizontal: mS(20),
    },
})