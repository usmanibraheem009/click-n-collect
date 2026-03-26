import ScreenHeader from '@/src/components/layout/screen-header'
import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import SimpleButton from '@/src/components/premitives/simple-button'
import { removeFromCart } from '@/src/redux/slices/cartSlice'
import { toggleFavorites } from '@/src/redux/slices/favouriteSlice'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

const Bag = () => {

  const cartItems = useSelector((state: any) => state.cartReducer.cartItems);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  console.log('cart items: ', cartItems);
  const dispatch = useDispatch();

  const subTotal = cartItems.reduce((total: number, item :any)=> total + item.price * item.quantity , 0 );

  const shippingFee = subTotal > 500? 0 : 10;

  const grandTotal = subTotal + shippingFee;


  return (
    <ScreenWrapper>
      <ScreenHeader searchIcon />

      <Text style={styles.titleText}>My Bag</Text>
      <FlatList data={cartItems}
        keyExtractor={(item) => `${item.id}-${item.size}-${item.color}`}
        renderItem={({ item }) => (
          <View style={styles.container}>

            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.prodImage} />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '60%' }}>
                <Text style={styles.key}>Color: </Text>
                <Text style={styles.value}>{item.color}</Text>
                <Text style={styles.key}>Size: </Text>
                <Text style={styles.value}>{item.size}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                  <TouchableOpacity style={styles.counterButton}><Text style={styles.counter}>+</Text></TouchableOpacity>
                  <Text style={{ fontSize: 18, fontWeight: 500 }}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.counterButton}><Text style={styles.counter}>-</Text></TouchableOpacity>
                </View>
                <Text style={styles.price} >{item.price} $</Text>
              </View>
            </View>

            <View >
              <Menu
                visible={activeMenuId === item.id}
                onDismiss={() => { setActiveMenuId(null) }}
                anchor={
                  <Pressable onPress={() => { setActiveMenuId(item.id) }} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                    <MaterialIcons name="more-vert" size={24} />
                  </Pressable>
                }
              >
                <Menu.Item onPress={() => {
                  setActiveMenuId(null);
                  dispatch(toggleFavorites(item))
                }}
                  title="Add to favorites"
                />
                <Menu.Item onPress={() => { dispatch(removeFromCart(item.id,)) }}
                  title="Delete from the list"
                />
              </Menu>
            </View>

          </View>
        )}>
      </FlatList >


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={styles.checkout}>Total amount: </Text>
        <Text style={styles.price}>{grandTotal}$</Text>
      </View>
      <SimpleButton btnText='CHECKOUT' onPress={() => { router.push({
        pathname: '/screens/check-out',
        params: {
          subTotal: subTotal,
          shippingFee: shippingFee,
          Total: grandTotal
        }
      })}} />
    </ScreenWrapper >
  )
}

export default Bag

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 120,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  prodImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    height: 120,
    width: '32%',
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10
  },
  detailsContainer: {
    gap: 10,
    padding: 10,
    width: '60%'
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    overflow: 'hidden',
  },
  key: {
    color: 'grey',
    fontSize: 12,
  },
  value: {
    fontSize: 12
  },
  counterButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    fontSize: 28,
    fontWeight: 600,
    color: 'grey'
  },
  price: {
    fontSize: 14,
    fontWeight: 500,
  },
  menuButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    color: 'grey'
  },
  checkout: {
    fontSize: 16,
    color: 'grey'
  }
})