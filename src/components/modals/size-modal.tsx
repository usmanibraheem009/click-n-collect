import { useTheme } from '@/src/hooks/useTheme';
import { mS, mVs } from '@/src/utils/scale';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimpleButton from '../premitives/simple-button';

interface sizeModalProps {
    visible: boolean,
    sizes: string[],
    onSelect: (size: string) => void,
    onClose: () => void,
};


const SizeModal = ({ visible, sizes, onClose, onSelect }: sizeModalProps) => {

    const { theme } = useTheme();

    return (
        <Modal visible={visible} transparent animationType='slide'>
            <View style={styles.overlay}>
                <View style={[styles.modal, { backgroundColor: theme.background.primary }]}>
                    <TouchableOpacity onPress={() => onClose()}>
                        <Ionicons name='close-circle-outline' style={styles.subTitle} color={theme.text.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.text.primary }]}>Select Size</Text>
                    <View style={styles.container}>
                        {sizes.map((size) => (
                            <TouchableOpacity key={size} onPress={() => { onSelect(size); onClose() }} style={[styles.buttons, { backgroundColor: theme.background.primary, borderColor: theme.border.primary }]}>
                                <Text style={[styles.btnText, { color: theme.text.primary }]}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <SimpleButton btnText='ADD TO CART' onPress={() => { }} />
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
        padding: mS(20),
        borderTopLeftRadius: mS(30),
        borderTopRightRadius: mS(30),
    },
    container: {
        flexDirection: 'row',
        gap: mVs(20),
        flexWrap: 'wrap',
        marginVertical: mVs(20),
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: mS(20),
        fontWeight: 'bold',
    },
    subTitle: {
        alignSelf: 'flex-end',
        fontSize: mS(30),
        fontWeight: 'bold',
    },
    buttons: {
        height: mVs(40),
        width: mS(100),
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: mS(14),
        fontWeight: '400',
    }
})