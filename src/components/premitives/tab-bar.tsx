import useTheme from '@/src/hooks/useTheme'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TabBar = ({title, subTitle, onPress}: {title: string, subTitle: string, onPress: () => void}) => {

  const {theme} = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subTitle, {color: theme.text.secondary}]}>{subTitle}</Text>
      </View>
      <MaterialIcons name='keyboard-arrow-right' size={24} color={theme.text.secondary} />
    </TouchableOpacity>
  )
}

export default TabBar

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    paddingVertical: 10
  },
  textContainer: {
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: 'gray'
  }
});