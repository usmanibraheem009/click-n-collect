import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import SimpleButton from '@/src/components/premitives/simple-button'
import TabBar from '@/src/components/premitives/tab-bar'
import UserCard from '@/src/components/premitives/user-card'
import { clearUser } from '@/src/redux/slices/authSlice'
import { logout } from '@/src/services/firebase/auth-services'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

const profile = () => {

  const dispatch = useDispatch();

  const logoutUser = async () => {
    await logout();
    dispatch(clearUser());
  }

  return (
    <ScreenWrapper>
      <View style={styles.userCard}>

        <UserCard />

        <View style={{ marginTop: 30 }}></View>

        <TabBar title='My orders' subTitle='Already have 12 orders' onPress={() => { }} />
        <TabBar title='Shipping Address' subTitle='3 addresses' onPress={() => { }} />
        <TabBar title='Payment methods' subTitle='Visa  **34' onPress={() => { }} />
        <TabBar title='Promocodes' subTitle='You have special promocodes' onPress={() => { }} />
        <TabBar title='My reveiews' subTitle='Reviews for 4 items' onPress={() => { }} />
        <TabBar title='Settings' subTitle='Notifications, password' onPress={() => { }} />

      </View>

      <View style={{ marginTop: 30 }}></View>

      <SimpleButton btnText='LOGOUT' onPress={logoutUser} />
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {

  }
})