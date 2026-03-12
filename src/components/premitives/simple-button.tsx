import useTheme from '@/src/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface btnProps{
    btnText: string,
    onPress: () => void,
}

const SimpleButton = ({btnText, onPress}: btnProps) => {
    const {theme} = useTheme();

  return (
    <TouchableOpacity style={[styles.btnContainer , {backgroundColor: theme.surface.primary}]} onPress={onPress}>
        <Text style={styles.text}>{btnText}</Text>
    </TouchableOpacity>
  )
}

export default SimpleButton

const styles = StyleSheet.create({
    btnContainer: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        fontWeight: 400,
        color: 'white'
    }
})