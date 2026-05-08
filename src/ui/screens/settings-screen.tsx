import ScreenHeader from '@/src/components/layout/screen-header'
import ScrollScreen from '@/src/components/layout/scroll-screen'
import ThemeButton from '@/src/components/premitives/theme-button'
import { useTheme } from '@/src/hooks/useTheme'
import { setTheme } from '@/src/redux/slices/themeSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import * as Notifications from 'expo-notifications'
import React, { useEffect, useState } from 'react'
import { Alert, Linking, StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

const SettingsScreen = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const [allowNotifications, setAllowNotifications] = useState(false);
    const currentMode = useSelector((state: RootState) => state.themereducer.currentMode);

    useEffect(() => {
        const checkPermission = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            setAllowNotifications(status === 'granted')
        };

        checkPermission();
    }, []);

    const handleNotificationToggle = async () => {
        if (allowNotifications) {
            Alert.alert(
                'Disable Notifications',
                'To turn off notifications, please go to your device settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            );
        } else {
            const { status } = await Notifications.requestPermissionsAsync();

            if (status === 'granted') {
                setAllowNotifications(true)
            } else if (status === 'denied') {
                Alert.alert(
                    'Permission Required',
                    'Notifications are blocked. Please enable them in your device settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => Linking.openSettings() }
                    ]
                );
            }
        }
    }

    return (
        <ScrollScreen paddingHorizontal={mS(20)}>
            <ScreenHeader backArrow title='Settings' />

            <Text style={[styles.labelText, { color: theme.text.primary }]}>Notifications</Text>
            <View style={[styles.notificationContainer, { backgroundColor: theme.background.secondary, borderColor: theme.border.secondary }]}>
                <Text style={[styles.titleText, { color: theme.text.secondary }]}>Notifications</Text>
                <Switch value={allowNotifications} onValueChange={handleNotificationToggle} />
            </View>

            <Text style={[styles.labelText, { color: theme.text.primary }]}>Theme</Text>
            <ThemeButton modeName='Light Mode' isActive={currentMode === 'light'} onPress={() => dispatch(setTheme('light'))} />
            <ThemeButton modeName='Dark Mode' isActive={currentMode === 'dark'} onPress={() => dispatch(setTheme('dark'))} />
            <ThemeButton modeName='System' isActive={currentMode === 'system'} onPress={() => dispatch(setTheme('system'))} />


        </ScrollScreen>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    labelText: {
        fontSize: mS(20),
        fontFamily: 'medium',
        marginTop: mVs(15)
    },
    notificationContainer: {
        padding: mS(15),
        borderRadius: mS(10),
        borderWidth: 1,
        flexDirection: 'row',
        gap: mVs(20),
        marginTop: mVs(10),
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: mVs(16),
        fontWeight: '500'
    }
})