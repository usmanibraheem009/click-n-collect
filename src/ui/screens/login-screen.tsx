import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import ErrorText from '@/src/components/premitives/error-text'
import InputTab from '@/src/components/premitives/Input-tab'
import SimpleButton from '@/src/components/premitives/simple-button'
import { setUser } from '@/src/redux/slices/authSlice'
import { loginUser } from '@/src/services/firebase/auth-services'
import { initialValues, validationSchema } from '@/src/utils/auth-form'
import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

const LoginScreen = () => {

  const dispatch = useDispatch();

  const submitFunc = async (values: any) => {
    try {
      const profile = await loginUser({
        email: values.email,
        password: values.password,
      });
      dispatch(setUser(profile));
    } catch (error) {
      console.log('Error loggin user: ', error)
    }
  }
  return (
    <ScreenWrapper>
      <Formik initialValues={initialValues.login} validationSchema={validationSchema.login} onSubmit={submitFunc}>
        {({values, handleChange, errors, touched, handleSubmit}: any) => (
          <View style={styles.container}>
          <InputTab value={values.email} onChangeText={handleChange('email')} placeHolderText='Email'/>
          {touched.email && errors.email && (<ErrorText errorText={errors.email} />)}
          
          <InputTab value={values.password} onChangeText={handleChange('password')} placeHolderText='Password'/>
          {touched.password && errors.password && (<ErrorText errorText={errors.password} />)}
          
          <SimpleButton btnText='Login' onPress={handleSubmit} />
          </View>
        )}
      </Formik>

    </ScreenWrapper>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10
  }
})