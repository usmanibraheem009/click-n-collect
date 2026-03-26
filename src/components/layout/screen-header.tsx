import useTheme from '@/src/hooks/useTheme'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface HeaderProps {
  backgroundColor?: string
  backArrow?: boolean
  searchIcon?: boolean
  shareIcon? : boolean
  title?: string
}

const ScreenHeader = ({ backgroundColor, backArrow = false, searchIcon = false, title, shareIcon = false}: HeaderProps) => {

  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  const bgColor =
    backgroundColor || theme.background.primary

  return (
    <View style={[ styles.container, { backgroundColor: bgColor, paddingTop: insets.top }]}>
      <View style={styles.left}>
        {backArrow && (
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios-new" size={22} color={theme.text.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        {title && (
          <Text style={[styles.title, { color: theme.text.primary } ]}> {title} </Text>
        )}
      </View>

      <View style={styles.right}>
        {searchIcon && (
          <TouchableOpacity>
            <MaterialIcons name ="search" size={24} color={theme.text.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.right}>
        {shareIcon && (
          <TouchableOpacity>
            <MaterialIcons name ="share" size={24} color={theme.text.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ScreenHeader

const styles = StyleSheet.create({

  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 10
  },

  left: {
    width: 40,
    justifyContent: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  right: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

})