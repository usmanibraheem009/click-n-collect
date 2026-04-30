import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import FacebookLogo from '../../../assets/svg/facebook.svg';
// @ts-ignore
import GoogleLogo from '../../../assets/svg/google.svg';
import SocialButton from '../../components/premitives/social-button';

interface authProps {
  authText: string,
  facebookLogin: () => void,
  googleLogin: () => void,
}
const AuthFooter = (data: authProps) => {

  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.text.primary }]}>{data.authText}</Text>
      <View style={styles.socialContainer}>
        <SocialButton SvgImage={GoogleLogo} />
        <SocialButton SvgImage={FacebookLogo} />
      </View>
    </View>
  )
}

export default AuthFooter

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center'
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
    alignSelf: 'center'
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }

})