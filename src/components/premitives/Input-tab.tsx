import { useTheme } from '@/src/hooks/useTheme';
import { mS, mVs } from '@/src/utils/scale';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface inputProps {
  value: string,
  onChangeText: () => void,
  placeHolderText: string,
  secureTextEntry?: boolean,
  tarilingIcon?: React.ReactNode;
}

const InputTab = (data: inputProps) => {

  const { theme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = data.secureTextEntry

  return (
    <View style={[styles.container, { backgroundColor: theme.surface.secondary }]}>
      <TextInput
        placeholder={data.placeHolderText}
        value={data.value}
        onChangeText={data.onChangeText}
        cursorColor={theme.text.primary}
        placeholderTextColor={theme.text.disabled}
        secureTextEntry={isPasswordField && !isPasswordVisible}
        style={[styles.inputStyle, { color: theme.text.primary }]}
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
    borderRadius: 20,
    elevation: 1,
    paddingHorizontal: mS(20),

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
  }
});

export default InputTab