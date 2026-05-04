import { useTheme } from '@/src/hooks/useTheme';
import { mS, mVs } from '@/src/utils/scale';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface inputTabProps extends TextInputProps {
  icon?: React.ReactNode,
  onIconPress?: () => void,
  centerAlign?: boolean,
  numberOfLines?: number,
  multiline?: boolean
}

const InputTab = ({ icon, placeholder, value, multiline = false, numberOfLines, style, onIconPress, onChangeText, centerAlign, ...props }: inputTabProps) => {

  const { theme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = props.secureTextEntry
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface.secondary, borderColor: isFocused ? theme.border.tertiary : 'transparent' }]}>
      <TextInput
        value={value}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.text.secondary}
        cursorColor={'#B0B5BC'}

        style={[styles.textInput, { color: theme.text.primary, textAlign: centerAlign ? 'center' : 'left' }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {isPasswordField && (
        <TouchableOpacity onPress={() => { setIsPasswordVisible(prev => !prev) }} style={styles.iconContainer}>
          <Ionicons name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={mVs(24)} color={theme.text.disabled} />
        </TouchableOpacity>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: mVs(64),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: mS(10),
    elevation: 1,
    paddingHorizontal: mS(20),
    borderWidth: 1
  },
  inputStyle: {
    flex: 1,
    fontSize: mVs(16),
    fontWeight: 400,
  },
  iconContainer: {
    paddingLeft: mS(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: mVs(18)
  }
});

export default InputTab