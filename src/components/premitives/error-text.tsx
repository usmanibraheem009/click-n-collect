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
        fontSize: 12,
        fontWeight: 400,
        color: 'red'
    }
})