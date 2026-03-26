import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SimpleButton from '../premitives/simple-button'

interface colorModalProps{
    visible: boolean,
    colors: string[],
    onSelect: (color: string) => void,
    onClose: ()=> void
}

const ColorModal = ({visible, colors, onClose, onSelect}: colorModalProps) => {
  return (
    <Modal visible={visible} transparent animationType='slide' >
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <Ionicons name='close-circle-outline' style={styles.closeButton} onPress={() => onClose()} />
                <Text style={styles.title}>Select Color</Text>
                <View style={styles.container}>
                    {colors.map((color) => (
                        <TouchableOpacity key={color} onPress={() => {onSelect(color); onClose()}} style={styles.buttons}>
                            <Text>{color}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <SimpleButton btnText='ADD TO CART' onPress={() => {}} />
            </View>
        </View>
    </Modal>
  )
}

export default ColorModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    container: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        marginVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        alignSelf: 'center'
    },
    subTitle: {

    },
    buttons: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1
    },
    closeButton: {
        alignSelf: 'flex-end',
        fontSize: 30,
    }
})