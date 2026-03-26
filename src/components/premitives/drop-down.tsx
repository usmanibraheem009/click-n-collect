import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface dropdownProps{
    btnText: string,
    onPress: () => void
}

const DropDown = ({btnText, onPress} : dropdownProps) => {
    return (
        <TouchableOpacity style={styles.dropDown} onPress={onPress}>
            <View style={styles.dropButton}>
                <Text style={{fontSize: 14, fontWeight: 500}}>{btnText}</Text>
                <MaterialIcons name='keyboard-arrow-down' size={18}/>
            </View>
        </TouchableOpacity>
    )
}

export default DropDown

const styles = StyleSheet.create({
    dropDown: {
        height: 50,
        width: '40%',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    dropButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})