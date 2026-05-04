import KeyboardAvoiding from '@/src/components/layout/keyboard-avoiding'
import InputTab from '@/src/components/premitives/Input-tab'
import ErrorText from '@/src/components/premitives/error-text'
import SimpleButton from '@/src/components/premitives/simple-button'
import { useTheme } from '@/src/hooks/useTheme'
import { setUser } from '@/src/redux/slices/authSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch } from '@/src/redux/store/myStore'
import { registerUser } from '@/src/services/firebase/auth-services'
import { initialValues, validationSchema } from '@/src/utils/auth-form'
import { mS, mVs } from '@/src/utils/scale'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AuthFooter from '../../components/auth-footer'
import AuthHeader from '../../components/auth-header'

const SignupScreen = () => {

  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const submitFunc = async (values: any) => {
    try {
      setLoading(true);
      const profile = await registerUser({
        userName: values.name,
        email: values.email,
        password: values.password,
        profileImageUrl: ' '
      });
      dispatch(showSnackbar({ message: 'User registered successfully', type: 'success' }));
      dispatch(setUser(profile));
      router.replace('/(tabs)');
    } catch (error: any) {
      dispatch(showSnackbar({ message: error, type: 'error' }));
      throw error
    } finally {
      setLoading(false)
    }
  };

  return (
    <KeyboardAvoiding paddingHorizontal={mS(20)}>
      <AuthHeader headerText='Sign up' />
      <Formik initialValues={initialValues.signup} validationSchema={validationSchema.signup} onSubmit={submitFunc}>
        {({ values, errors, handleChange, touched, handleSubmit }: any) => (
          <View style={styles.container}>
            <InputTab value={values.name} onChangeText={handleChange('name')} placeholder='Name' />
            {touched.name && errors.name && (<ErrorText errorText={errors.name} />)}

            <InputTab value={values.email} onChangeText={handleChange('email')} placeholder='Email' />
            {touched.email && errors.email && (<ErrorText errorText={errors.email} />)}

            <InputTab value={values.password} secureTextEntry onChangeText={handleChange('password')} placeholder='Password' />
            {touched.password && errors.password && (<ErrorText errorText={errors.password} />)}

            <InputTab value={values.confirmPassword} secureTextEntry onChangeText={handleChange('confirmPassword')} placeholder='Confirm Password' />
            {touched.password && errors.password && (<ErrorText errorText={errors.confirmPassword} />)}

            <TouchableOpacity onPress={() => { router.push('/screens/login-screen') }} style={styles.router}>
              <Text style={[styles.loginText, { color: theme.text.primary }]}>Already have an account?</Text>
              <FontAwesome name='long-arrow-right' size={25} color={theme.surface.primary} />
            </TouchableOpacity>

            <SimpleButton btnText='SIGN UP' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <AuthFooter authText='Or sign up with social account' googleLogin={() => { }} facebookLogin={() => { }} />
    </KeyboardAvoiding>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: mVs(10),
  },
  router: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
  loginText: {
    fontSize: mVs(14),
    fontWeight: '500',
  }
})