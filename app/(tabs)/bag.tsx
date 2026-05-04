import Screen from '@/src/components/layout/screen'
import ScreenHeader from '@/src/components/layout/screen-header'
import SimpleButton from '@/src/components/premitives/simple-button'
import { useTheme } from '@/src/hooks/useTheme'
import { decrementQuantity, incrementQuantity, removeFromCart } from '@/src/redux/slices/cartSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useMemo } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

const Bag = () => {

  const cartItems = useSelector((state: RootState) => state.cartreducer.cartItems);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const subTotal = useMemo(() =>
    cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0)
    , [cartItems]);

  const shippingFee = cartItems ?? subTotal > 500 ? 0 : 10;
  const grandTotal = subTotal + shippingFee;

  const deleteItem = (item: any) => {
    Alert.alert('Delete Warning', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes', style: 'destructive', onPress: () => {
          dispatch(removeFromCart(item.id));
          dispatch(showSnackbar({ message: 'Item removed from cart!', type: 'success' }));
        }
      }
    ])
  };

  const handlePress = () => {
    if (cartItems.length === 0) {
      return Alert.alert('Your bag is empty', 'Please add items before proceeding to checkout.')
    }
    router.push('/screens/check-out')
  }

  return (
    <Screen paddingHorizontal={mS(20)}>
      <ScreenHeader searchIcon />

      <Text style={[styles.titleText, { color: theme.text.primary }]}>My Bag</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => `${item.id}-${item.size}-${item.color}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: mVs(20) }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.surface.secondary }]}>

            <View style={[styles.imageContainer, { backgroundColor: theme.background.primary }]}>
              <Image source={{ uri: item.image }} style={styles.prodImage} />
            </View>

            <View style={styles.detailsContainer}>

              <Text
                style={[styles.title, { color: theme.text.primary }]}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {item.title}
              </Text>

              <View style={styles.attributeRow}>
                <Text style={[styles.key, { color: theme.text.disabled }]}>Color: </Text>
                <Text style={[styles.value, { color: theme.text.primary }]}>{item.color}</Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={[styles.key, { color: theme.text.disabled }]}>Size: </Text>
                <Text style={[styles.value, { color: theme.text.primary }]}>{item.size}</Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={[styles.price, { color: theme.text.primary }]}>
                  ${item.price.toFixed(2)}
                </Text>
                <View style={styles.counter}>
                  <Ionicons name='remove-circle-outline' size={mS(26)} color={theme.surface.primary} onPress={() => dispatch(decrementQuantity(item.id))} />
                  <Text style={[styles.quantity, { color: theme.text.primary }]}>{item.quantity}</Text>
                  <Ionicons name='add-circle-outline' size={mS(26)} color={theme.surface.primary} onPress={() => dispatch(incrementQuantity(item.id))} />
                </View>
              </View>

            </View>

            <Pressable
              style={styles.trashIcon}
              onPress={() => deleteItem(item)}
            >
              <Ionicons name='trash' size={mS(24)} color={theme.text.secondary} />
            </Pressable>

          </View>
        )}
      />

      <View style={[styles.summaryContainer, { borderTopColor: theme.surface.secondary }]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.text.disabled }]}>Subtotal</Text>
          <Text style={[styles.summaryValue, { color: theme.text.primary }]}>${subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.text.disabled }]}>Shipping</Text>
          <Text style={[styles.summaryValue, { color: theme.text.primary }]}>
            {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.totalLabel, { color: theme.text.primary }]}>Total</Text>
          <Text style={[styles.totalValue, { color: '#FF4B4B' }]}>${grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      <SimpleButton btnText='CHECKOUT' onPress={handlePress} />
    </Screen>
  )
}

export default Bag

const styles = StyleSheet.create({
  titleText: {
    fontSize: mS(34),
    fontWeight: 'bold',
    marginBottom: mVs(10),
  },
  card: {
    marginTop: mVs(14),
    width: '100%',
    borderRadius: mS(16),
    flexDirection: 'row',
    padding: mS(12),
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    gap: mS(10),
  },
  imageContainer: {
    height: mVs(130),
    width: mS(100),
    borderRadius: mS(12),
    overflow: 'hidden',
    flexShrink: 0,
  },
  prodImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    gap: mVs(6),
    justifyContent: 'center',
  },
  title: {
    fontSize: mS(14),
    fontWeight: '600',
    lineHeight: mVs(20),
    maxWidth: '90%',
    paddingRight: mS(8),
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  key: {
    fontSize: mS(12),
    fontWeight: '500',
  },
  value: {
    fontSize: mS(12),
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: mVs(4),
  },
  price: {
    fontSize: mS(18),
    fontWeight: '700',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: mS(8),
  },
  quantity: {
    fontSize: mS(16),
    fontWeight: '600',
    minWidth: mS(16),
    textAlign: 'center',
  },
  trashIcon: {
    position: 'absolute',
    top: mVs(12),
    right: mS(12),
  },
  summaryContainer: {
    borderTopWidth: 1,
    paddingTop: mVs(16),
    marginTop: mVs(10),
    marginBottom: mVs(16),
    gap: mVs(8),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: mS(14),
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: mS(14),
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: mS(16),
    fontWeight: '700',
  },
  totalValue: {
    fontSize: mS(18),
    fontWeight: '700',
  },
})