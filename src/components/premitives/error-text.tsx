import React from 'react'
import { StyleSheet, Text } from 'react-native'

type props = {
    errorText: string
}

const ErrorText = ({errorText}: props) => {
  return (
    <Text style={styles.text}>{errorText}</Text>
  )
}

export default ErrorText

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 500,
        color: 'red'
    }
})