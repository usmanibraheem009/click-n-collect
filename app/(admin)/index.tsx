import { logoutUser } from '@/src/apis/authApi'
import ReportCard from '@/src/components/admin/report-card'
import DashHeader from '@/src/components/layout/dash-header'
import Screen from '@/src/components/layout/screen'
import { useTheme } from '@/src/hooks/useTheme'
import { mS } from '@/src/utils/scale'
import { router } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const index = () => {

    const { theme } = useTheme();
    const { t } = useTranslation();
    const logout = async () => {
        await logoutUser();
        router.replace('/screens/signup-screen');
    }

    return (
        <Screen paddingHorizontal={mS(16)}>
            <DashHeader />

            <ReportCard label='net sales' heading={`$ 17000`} />
        </Screen>
    )
}

export default index

const styles = StyleSheet.create({})