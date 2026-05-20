import { fetchCurrentUser, loginUser } from '@/src/apis/authApi'
import KeyboardAvoiding from '@/src/components/layout/keyboard-avoiding'
import ErrorText from '@/src/components/premitives/error-text'
import InputTab from '@/src/components/premitives/Input-tab'
import SimpleButton from '@/src/components/premitives/simple-button'
import { useTheme } from '@/src/hooks/useTheme'
import { saveSessionToStore } from '@/src/redux/slices/authSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { initialValues, validationSchema } from '@/src/utils/auth-form'
import { mS } from '@/src/utils/scale'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AuthFooter from '../../components/auth-footer'
import AuthHeader from '../../components/auth-header'

const LoginScreen = () => {

  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { role } = useSelector((state: RootState) => state.userreducer);

  const submitFunc = async (values: any) => {
    try {
      setLoading(true);
      const res = await loginUser({ email: values.email, password: values.password });

      await saveSessionToStore({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        sessionId: res.sessionId,
        expiresAt: res.expiresAt,
        isLoggedIn: true
      });
      const user = await dispatch(fetchCurrentUser()).unwrap();
      dispatch(showSnackbar({ message: `Welcome back ${values.email}`, type: 'success' }));
      if (user.role === 'ADMIN') {
        router.replace('/(admin)');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      console.log("login error: ", error);

      dispatch(showSnackbar({ message: error.message, type: 'error' }));
    } finally {
      setLoading(false);
    }
  }
  return (
    <KeyboardAvoiding paddingHorizontal={mS(20)}>
      <AuthHeader headerText='Login' backArrow />
      <Formik initialValues={initialValues.login} validationSchema={validationSchema.login} onSubmit={submitFunc}>
        {({ values, handleChange, errors, touched, handleSubmit }: any) => (
          <View style={styles.container}>
            <InputTab value={values.email} onChangeText={handleChange('email')} placeholder='Email' />
            {touched.email && errors.email && (<ErrorText errorText={errors.email} />)}

            <InputTab value={values.password} onChangeText={handleChange('password')} secureTextEntry placeholder='Password' />
            {touched.password && errors.password && (<ErrorText errorText={errors.password} />)}

            <TouchableOpacity onPress={() => { router.push('/screens/forgot-password') }} style={styles.forgotPassword}>
              <Text style={{ fontSize: 14, fontWeight: 500, color: theme.text.primary }}>Forgot your Password?</Text>
              <FontAwesome name='long-arrow-right' color={theme.surface.primary} size={24} />
            </TouchableOpacity>

            <SimpleButton btnText='Login' onPress={handleSubmit} isLoading={loading} />
          </View>
        )}
      </Formik>

      <AuthFooter authText='Or login with social account' facebookLogin={() => { }} googleLogin={() => { }} />

    </KeyboardAvoiding>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10
  },
  forgotPassword: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 10
  },
  socialContainer: {

  }
})