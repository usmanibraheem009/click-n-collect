import { useTheme } from '@/src/hooks/useTheme'
import { mS, mVs } from '@/src/utils/scale'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface dropdownProps {
    btnText: string,
    onPress: () => void
}

const DropDown = ({ btnText, onPress }: dropdownProps) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity style={[styles.dropDown, { backgroundColor: theme.surface.secondary, borderColor: theme.border.primary }]} onPress={onPress}>
            <View style={styles.dropButton}>
                <Text style={[styles.text, { color: theme.text.disabled }]}>{btnText}</Text>
                <MaterialIcons name='keyboard-arrow-down' size={18} color={theme.text.disabled} />
            </View>
        </TouchableOpacity>
    )
}

export default DropDown

const styles = StyleSheet.create({
    dropDown: {
        height: mVs(50),
        width: '40%',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: mS(10),
    },
    dropButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: mS(14),
        fontWeight: "500",
    }
})