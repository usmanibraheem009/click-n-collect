import { useTheme } from '@/src/hooks/useTheme'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface authProps {
    headerText?: string,
    backArrow?: boolean
}

const AuthHeader = (data: authProps) => {

    const { theme } = useTheme();

    return (
        <View>
            {data.backArrow && (
                <MaterialIcons name='arrow-back-ios-new' onPress={() => { router.back() }} style={[styles.arrowBack, { color: theme.text.primary }]} size={24} />
            )}

            <Text style={[styles.text, { color: theme.text.primary }]}>{data.headerText}</Text>
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({

    text: {
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 90
    },
    arrowBack: { marginTop: 20, }
})