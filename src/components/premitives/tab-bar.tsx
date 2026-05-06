import { useTheme } from '@/src/hooks/useTheme';
import { mS } from '@/src/utils/scale';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface tabBarProps {
  title: string;
  subTitle: string,
  onPress: () => void
}

const TabBar = ({ title, subTitle, onPress }: tabBarProps) => {

  const { theme } = useTheme();

  return (
    <Pressable style={[styles.container, { borderBottomColor: theme.border.primary }]} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text.primary }]}>{title}</Text>
        <Text style={[styles.subTitle, { color: theme.text.secondary }]}>{subTitle}</Text>
      </View>
      <MaterialIcons name='keyboard-arrow-right' size={24} color={theme.text.secondary} />
    </Pressable>
  )
}

export default TabBar

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: mS(10),
    marginTop: mS(10)
  },
  textContainer: {
    gap: 5,
  },
  title: {
    fontSize: mS(18),
    fontFamily: 'medium',
  },
  subTitle: {
    fontSize: mS(14),
    fontWeight: '500',
  }
});