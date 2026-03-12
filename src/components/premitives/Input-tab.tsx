import useTheme from '@/src/hooks/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface inputProps{
    value: string,
    onChangeText: () => void,
    placeHolderText: string
}

const InputTab = (data: inputProps) => {

  const {theme} = useTheme();

  return (
    <TextInput
    label={data.placeHolderText}
    mode='flat'
    underlineColor='transparent'
    activeUnderlineColor='transparent'
    value={data.value}
    onChangeText={data.onChangeText}
    textColor={theme.text.primary}
    cursorColor='black'
    placeholderTextColor={'#9B9B9B'}
    style={[styles.inputStyle, {backgroundColor: theme.surface.secondary}]}
    />
  )
};

const styles = StyleSheet.create({
    inputStyle: {
        height: 64,
        width: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 400,
    }
});

export default InputTab