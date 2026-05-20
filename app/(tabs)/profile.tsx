import { logoutUser } from '@/src/apis/authApi'
import ScreenFooter from '@/src/components/layout/screen-footer'
import ScreenHeader from '@/src/components/layout/screen-header'
import ScrollScreen from '@/src/components/layout/scroll-screen'
import TabBar from '@/src/components/premitives/tab-bar'
import UserCard from '@/src/components/premitives/user-card'
import { useTheme } from '@/src/hooks/useTheme'
import { setLoggedOut } from '@/src/redux/slices/authSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { router } from 'expo-router'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const cartItems = useSelector((state: RootState) => state.cartreducer.cartItems);
  const addressList = useSelector((state: RootState) => state.addressreducer.addressList);
  const paymentList = useSelector((state: RootState) => state.paymentreducer.paymentList);
  const favorites = useSelector((state: RootState) => state.favoritesreducer.favorites);

  const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout', style: 'destructive', onPress: async () => {
          await logoutUser();
          dispatch(setLoggedOut());
          router.replace('/screens/signup-screen');
        }
      }
    ]);
  }

  const tabs = [
    {
      title: 'My Orders',
      subTitle: 'Track and manage your orders',
      icon: 'bag-outline',
      onPress: () => router.push('/screens/orders-list'),
    },
    {
      title: 'Shipping Address',
      subTitle: `${addressList.length} saved address${addressList.length !== 1 ? 'es' : ''}`,
      icon: 'location-outline',
      onPress: () => router.push('/screens/shipping-addresses'),
    },
    {
      title: 'Payment Methods',
      subTitle: `${paymentList.length} saved method${paymentList.length !== 1 ? 's' : ''}`,
      icon: 'card-outline',
      onPress: () => router.push('/screens/payment-methods'),
    },
    {
      title: 'Wishlist',
      subTitle: `${favorites.length} saved item${favorites.length !== 1 ? 's' : ''}`,
      icon: 'heart-outline',
      onPress: () => router.replace('/(tabs)/favorites'),
    },
    {
      title: 'Promocodes',
      subTitle: 'View your special promocodes',
      icon: 'pricetag-outline',
      onPress: () => { },
    },
    {
      title: 'My Reviews',
      subTitle: 'Reviews you have written',
      icon: 'star-outline',
      onPress: () => { },
    },
    {
      title: 'Settings',
      subTitle: 'Notifications, password, theme',
      icon: 'settings-outline',
      onPress: () => router.push('/screens/settings-screen'),
    },
  ];

  return (
    <>
      <ScrollScreen paddingHorizontal={mS(20)}>
        <ScreenHeader title='My Profile' />
        <UserCard />

        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <View key={tab.title}>
              <TabBar
                title={tab.title}
                subTitle={tab.subTitle}
                onPress={() => tab.onPress?.()}
              />
            </View>
          ))}
        </View>

      </ScrollScreen>

      <ScreenFooter buttonText='Logout' onButtonPress={logout} />
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  tabsContainer: {
    marginTop: mVs(20),
  },
  divider: {
    height: 1,
    marginHorizontal: mS(4),
  },
})