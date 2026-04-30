import Screen from '@/src/components/layout/screen'
import ScreenHeader from '@/src/components/layout/screen-header'
import { useTheme } from '@/src/hooks/useTheme'
import { toggleFavorites } from '@/src/redux/slices/favouriteSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const favorites = () => {
  const favoriteItems = useSelector((state: RootState) => state.favoritesreducer.favorites);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  const removeItem = (item: any) => {
    Alert.alert('Delete Warning', 'Remove this item from favourites?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes', style: 'destructive', onPress: () => {
          dispatch(toggleFavorites(item));
          dispatch(showSnackbar({ message: 'Item removed from Favorites!', type: 'success' }));
        }
      }
    ])
  };

  return (
    <Screen paddingHorizontal={mS(20)}>
      <ScreenHeader searchIcon />

      <Text style={[styles.titleText, { color: theme.text.primary }]}>Favorites</Text>

      <FlatList
        data={favoriteItems}
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

            </View>

            <Pressable
              style={styles.trashIcon}
              onPress={() => removeItem(item)}
            >
              <Ionicons name='heart' size={mS(24)} color={theme.text.secondary} />
            </Pressable>

          </View>
        )}
      />

    </Screen>
  )
}

export default favorites

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