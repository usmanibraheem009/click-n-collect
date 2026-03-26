import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import InputTab from '@/src/components/premitives/Input-tab'
import ErrorText from '@/src/components/premitives/error-text'
import SimpleButton from '@/src/components/premitives/simple-button'
import useTheme from '@/src/hooks/useTheme'
import { setUser } from '@/src/redux/slices/authSlice'
import { registerUser } from '@/src/services/firebase/auth-services'
import { initialValues, validationSchema } from '@/src/utils/auth-form'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AuthFooter from '../components/auth-footer'
import AuthHeader from '../components/auth-header'

const SignupScreen = () => {

  const {theme} = useTheme();
  const dispatch = useDispatch();

  const submitFunc = async ( values: any ) => {
    try{
      const profile = await registerUser({
        userName: values.name,
        email: values.email,
        password: values.password,
        profileImageUrl: ' '
      });
      dispatch(setUser(profile));  
      console.log('profile', profile)
      router.replace('/(tabs)');
    }catch(error){
      console.log('Error registering user: ', error);
      throw error
    }
  };

  return (
    <ScreenWrapper>
      <AuthHeader headerText='Sign up' />
      <Formik initialValues={initialValues.signup} validationSchema={validationSchema.signup} onSubmit={submitFunc}>
        {({values, errors, handleChange, touched, handleSubmit}: any) => (
          <View style={styles.container}>
            <InputTab value={values.name} onChangeText={handleChange('name')} placeHolderText='Name' />
            {touched.name && errors.name &&(<ErrorText errorText={errors.name} />)}
            <InputTab value={values.email} onChangeText={handleChange('email')} placeHolderText='Email' />
            {touched.email && errors.email &&(<ErrorText errorText={errors.email} />)}
            <InputTab value={values.password} onChangeText={handleChange('password')} placeHolderText='Password' />
            {touched.password && errors.password &&(<ErrorText errorText={errors.password} />)}
            <InputTab value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} placeHolderText='Confirm Password' />
            {touched.password && errors.password &&(<ErrorText errorText={errors.confirmPassword} />)}

            <TouchableOpacity onPress={() => {router.push('/screens/login-screen')}} style={styles.router}>
              <Text>Already have an account?</Text>
              <FontAwesome name='long-arrow-right' size={25} color={theme.surface.primary}/>
            </TouchableOpacity>

            <SimpleButton btnText='SIGN UP' onPress={handleSubmit} />
          </View>
        )} 
      </Formik>
      <AuthFooter authText='Or sign up with social account' googleLogin={() => {}} facebookLogin={() => {}} />
    </ScreenWrapper>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    gap: 10
  },
  router: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  }
})