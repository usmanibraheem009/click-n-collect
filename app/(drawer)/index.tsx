import { logoutUser } from '@/src/apis/authApi'
import Screen from '@/src/components/layout/screen'
import SimpleButton from '@/src/components/premitives/simple-button'
import { useTheme } from '@/src/hooks/useTheme'
import { mS } from '@/src/utils/scale'
import { router } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text } from 'react-native'

const index = () => {

    const { theme } = useTheme();
    const { t } = useTranslation();
    const logout = async () => {
        await logoutUser();
        router.replace('/screens/signup-screen');
    }

    return (
        <Screen paddingHorizontal={mS(16)}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text.primary }}>{t('greetings.morning')}</Text>
            <SimpleButton btnText='Logout' onPress={logout} />
        </Screen>
    )
}

export default index

const styles = StyleSheet.create({})