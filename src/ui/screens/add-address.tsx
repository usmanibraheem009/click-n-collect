import KeyboardAvoiding from '@/src/components/layout/keyboard-avoiding'
import ScreenHeader from '@/src/components/layout/screen-header'
import AddressModal from '@/src/components/modals/address-modal'
import ErrorText from '@/src/components/premitives/error-text'
import InputTab from '@/src/components/premitives/Input-tab'
import SimpleButton from '@/src/components/premitives/simple-button'
import { useTheme } from '@/src/hooks/useTheme'
import { addOrderAddress, fetchCity, fetchCountries, fetchStates, newAddress } from '@/src/redux/slices/addressSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { initialValues, validationSchema } from '@/src/utils/forms'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const LOCATION_TYPES = [
    { label: 'Home', icon: 'home-outline' },
    { label: 'Office', icon: 'briefcase-outline' },
    { label: 'Educational Institute', icon: 'school-outline' },
    { label: 'Other', icon: 'location-outline' },
] as const;

const AddAddress = () => {

    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { country, state, city } = useSelector((state: RootState) => state.addressreducer);
    const [showCountry, setShowCountry] = useState(false);
    const [showState, setShowState] = useState(false);
    const [showCity, setShowCity] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchCountries());
    }, []);

    const submitFunc = (values: newAddress) => {
        setLoading(true);
        dispatch(addOrderAddress(values));
        setLoading(false);
        dispatch(showSnackbar({ message: 'Address added successfully!', type: 'success' }));
        router.back();
    }

    return (
        <KeyboardAvoiding paddingHorizontal={mVs(20)}>
            <ScreenHeader backArrow title='Address' />
            <Formik
                initialValues={initialValues.address}
                validationSchema={validationSchema.address}
                enableReinitialize
                onSubmit={submitFunc}>
                {({ values, errors, handleChange, touched, setFieldValue, handleSubmit }: any) => (
                    <View>

                        <Text style={[styles.labelText, { color: theme.text.primary }]}>Select Country</Text>
                        <Pressable onPress={() => setShowCountry(true)}>
                            <InputTab placeholder='Select country' value={values.country} editable={false} />
                            {touched.country && errors.country && <ErrorText errorText={errors.country} />}
                        </Pressable>
                        {showCountry && (
                            <AddressModal
                                visible={showCountry}
                                onClose={() => setShowCountry(false)}
                                modalTitle='Select Country'
                                values={country}
                                onSelected={(c: any) => {
                                    setFieldValue('country', c.label);
                                    setFieldValue('state', '');
                                    setFieldValue('city', '');
                                    dispatch(fetchStates(c.label));
                                    setShowCountry(false);
                                }} />
                        )}

                        <Text style={[styles.labelText, { color: theme.text.primary }]}>Select State</Text>
                        <Pressable onPress={() => setShowState(true)}>
                            <InputTab placeholder='Select state' value={values.state} editable={false} />
                            {touched.state && errors.state && <ErrorText errorText={errors.state} />}
                        </Pressable>
                        {showState && (
                            <AddressModal
                                visible={showState}
                                onClose={() => setShowState(false)}
                                modalTitle='Select State'
                                values={state}
                                onSelected={(s: any) => {
                                    setFieldValue('state', s.label);
                                    setFieldValue('city', '');
                                    dispatch(fetchCity({ country: values.country, state: s.label }));
                                    setShowState(false);
                                }} />
                        )}

                        <Text style={[styles.labelText, { color: theme.text.primary }]}>Select City</Text>
                        <Pressable onPress={() => setShowCity(true)}>
                            <InputTab placeholder='Select city' value={values.city} editable={false} />
                            {touched.city && errors.city && <ErrorText errorText={errors.city} />}
                        </Pressable>
                        {showCity && (
                            <AddressModal
                                visible={showCity}
                                onClose={() => setShowCity(false)}
                                modalTitle='Select City'
                                values={city}
                                onSelected={(c: any) => {
                                    setFieldValue('city', c.label);
                                    setShowCity(false);
                                }} />
                        )}

                        <Text style={[styles.labelText, { color: theme.text.primary }]}>Street Address</Text>
                        <InputTab placeholder='Street Address' value={values.streetAddress} onChangeText={handleChange('streetAddress')} />
                        {touched.streetAddress && errors.streetAddress && <ErrorText errorText={errors.streetAddress} />}

                        <Text style={[styles.labelText, { color: theme.text.primary }]}>Land Mark</Text>
                        <InputTab placeholder='e.g: Any famous point nearby' value={values.landMark} onChangeText={handleChange('landMark')} />

                        <Text style={[styles.labelText, { color: theme.text.primary }]}>Phone Number</Text>
                        <InputTab placeholder='e.g: 03001234567' value={values.phoneNumber} onChangeText={handleChange('phoneNumber')} />
                        {touched.phoneNumber && errors.phoneNumber && <ErrorText errorText={errors.phoneNumber} />}

                        <Text style={[styles.labelText, { color: theme.text.primary }]}>Location Type</Text>
                        <View style={styles.radioGrid}>
                            {LOCATION_TYPES.map(({ label, icon }) => {
                                const isSelected = values.type === label;
                                return (
                                    <Pressable
                                        key={label}
                                        onPress={() => setFieldValue('type', label)}
                                        style={[
                                            styles.radioCard,
                                            {
                                                backgroundColor: isSelected ? theme.surface.primary : theme.surface.secondary,
                                                borderColor: isSelected ? theme.surface.primary : theme.border.primary,
                                            }
                                        ]}
                                    >
                                        <Ionicons
                                            name={icon}
                                            size={mS(22)}
                                            color={isSelected ? '#FFFFFF' : theme.text.secondary}
                                        />
                                        <Text style={[
                                            styles.radioLabel,
                                            { color: isSelected ? '#FFFFFF' : theme.text.primary }
                                        ]}>
                                            {label}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                        {touched.type && errors.type && <ErrorText errorText={errors.type} />}

                        <View style={styles.buttonContainer}>
                            <SimpleButton btnText='Add Address' onPress={handleSubmit} isLoading={loading} />
                        </View>

                    </View>
                )}
            </Formik>
        </KeyboardAvoiding>
    )
}

export default AddAddress

const styles = StyleSheet.create({
    labelText: {
        marginTop: mVs(15),
        marginBottom: mVs(8),
        fontSize: mS(13),
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    radioGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: mS(10),
    },
    radioCard: {
        width: '47%',               // 2 per row with gap
        paddingVertical: mVs(14),
        paddingHorizontal: mS(12),
        borderRadius: mS(14),
        borderWidth: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: mS(8),
    },
    radioLabel: {
        fontSize: mS(13),
        fontWeight: '500',
        flexShrink: 1,              // handles long text like "Educational Institute"
    },
    buttonContainer: {
        marginTop: mVs(24),
        marginBottom: mVs(10),
    }
})