import { useTheme } from '@/src/hooks/useTheme';
import { mVs } from '@/src/utils/scale';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface btnProps {
    btnText: string,
    onPress: () => void,
    disabled?: boolean,
    isLoading?: boolean
}

const SimpleButton = ({ btnText, onPress, isLoading, disabled = false }: btnProps) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity style={[styles.btnContainer, { backgroundColor: theme.surface.primary }]} onPress={onPress} disabled={isLoading || disabled}>
            {isLoading ?
                <ActivityIndicator size={'large'} color={theme.text.primary} /> :
                <Text style={styles.text}>{btnText}</Text>
            }
        </TouchableOpacity>
    )
}

export default SimpleButton

const styles = StyleSheet.create({
    btnContainer: {
        height: mVs(60),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 3,
    },
    text: {
        fontSize: mVs(16),
        fontWeight: '500',
        color: 'white'
    }
})