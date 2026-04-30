import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import ErrorText from '@/src/components/premitives/error-text'
import InputTab from '@/src/components/premitives/Input-tab'
import SimpleButton from '@/src/components/premitives/simple-button'
import { auth } from '@/src/services/firebaseConfig'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Formik } from 'formik'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import AuthHeader from '../../components/auth-header'

const ForgotPassword = () => {

  const initialValue = {
    email: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('please enter a valid email').required('email is required')
  });

  const submitFunc = async (values: any) => {
    try {
      console.log(`reset email sent to ${values.email}`)
      await sendPasswordResetEmail(auth, values.email);
      Alert.alert('Success',
        'A password reset email has been sent. Check your inbox.');
    } catch (error: any) {
      console.log(error);

      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email')
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Please enter a valid email')
      } else {
        Alert.alert('Something went wrong')
      }
    }
  };

  return (
    <ScreenWrapper>
      <AuthHeader headerText='Forgot password' backArrow />
      <Text style={styles.text}>Please enter your email address. You will recieve a link to create a new password via email.</Text>

      <View style={styles.spacer} />
      <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={submitFunc}>
        {({ errors, touched, handleChange, handleSubmit, values }: any) => (
          <View>
            <InputTab placeHolderText='Email' value={values.email} onChangeText={handleChange('email')} />
            {touched.email && errors.email && (<ErrorText errorText='Not a valid email address. Should be your@gmail.com' />)}

            <View style={styles.spacer} />
            <SimpleButton btnText='SEND' onPress={handleSubmit} />
          </View>
        )}
      </Formik>

    </ScreenWrapper>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 500,
  },
  spacer: {
    marginTop: 20
  }
})