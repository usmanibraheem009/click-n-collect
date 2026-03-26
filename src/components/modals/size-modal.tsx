import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimpleButton from '../premitives/simple-button';

interface sizeModalProps{
    visible: boolean,
    sizes: string[],
    onSelect: (size: string) => void,
    onClose: () => void,
};


const SizeModal = ({visible , sizes, onClose, onSelect}: sizeModalProps) => {
  return (
    <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <TouchableOpacity onPress={() => onClose()}>
                <Ionicons name='close-circle-outline' style={styles.subTitle} />
                </TouchableOpacity>
                <Text style={styles.title}>Select Size</Text>
                <View style={styles.container}>
                    {sizes.map((size) => (
                        <TouchableOpacity key={size} onPress={() => {onSelect(size); onClose()}} style={styles.buttons}>
                            <Text>{size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <SimpleButton btnText='ADD TO CART' onPress={( ) => {}} />
            </View>
        </View>
    </Modal>
  )
}

export default SizeModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    container: {
        flexDirection: 'row',
        gap: 20,
        flexWrap: 'wrap',
        marginVertical: 20,
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        alignSelf: 'flex-end',
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttons: {
        height: 40,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})