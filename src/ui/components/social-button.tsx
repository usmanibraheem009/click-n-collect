import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'

interface btnProps{
    SvgImage: React.FC<SvgProps>
}

const SocialButton = ({ SvgImage }: btnProps) => {
  return (
    <TouchableOpacity style={styles.container}>
        <SvgImage height={24} width={24}/>
    </TouchableOpacity>
  )
}

export default SocialButton

const styles = StyleSheet.create({
    container: {
        height: '23%',
        width: '35%',
        padding: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        elevation: 1,
    }
})