import LoadingIndicator from '@/src/components/layout/loading-indicator'
import Screen from '@/src/components/layout/screen'
import ProductCard from '@/src/components/premitives/product-card'
import { useTheme } from '@/src/hooks/useTheme'
import { setProductsByCategory } from '@/src/redux/slices/productSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { getCategories, getProductsByCategory } from '@/src/services/api/product-api'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sections, setSections] = useState<any[]>([]);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const favorites = useSelector((state: RootState) => state.favoritesreducer.favorites);
  const orderSummary = useSelector((state: RootState) => state.orderreducer);
  console.log('favorites: ', favorites)
  console.log('order summary: ', orderSummary)

  const fetchData = async () => {
    try {
      setLoading(true);
      const cats = await getCategories();
      const sectionsData = [];

      for (let cat of cats) {
        const products = await getProductsByCategory(cat);
        dispatch(setProductsByCategory({ category: cat, products }));

        sectionsData.push({
          title: cat,
          data: products,
        });
      }

      setSections(sectionsData);
    } catch (error: any) {
      dispatch(showSnackbar({ message: error, type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (attributes: any) => router.push({
    pathname: '/screens/details-screen',
    params: {
      id: attributes.id,
      name: attributes.title,
      price: attributes.price,
      category: attributes.category,
      image: attributes.image,
      description: attributes.description
    }
  })

  const renderCategoryItems = ({ item }: any) => (
    <ProductCard item={item} onPress={handleSubmit} />
  )

  const renderSection = ({ section }: any) => (
    <View style={{ marginVertical: 10 }}>
      <Text style={[styles.sectionHeader, { backgroundColor: theme.background.primary, color: theme.text.primary }]}>{(section.title)}</Text>
      <FlatList
        data={section.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );

  if (loading) {
    return (
      <LoadingIndicator />
    )
  }

  return (
    <Screen>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={() => null}
        renderSectionHeader={renderSection}
        stickySectionHeadersEnabled={false}
      />
    </Screen >
  );
};

export default Index;

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 15,
    textTransform: 'uppercase'
  },
  productContainer: {
    marginRight: 55,
    width: 120,
    gap: 10
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    height: 184,
    width: 150,
    padding: 20,
    backgroundColor: '#f4f1f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden'
  },
  titleText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: '500',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    color: 'red',
    fontWeight: '600',
  },
  fvrtBtn: {
    position: 'absolute',
    bottom: 80,
    right: -30,
    height: 40,
    width: 40,
    elevation: 5,
    backgroundColor: 'white',
    zIndex: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  banner: {
    width: '100%',
    height: 480,
    marginBottom: 10,
  }
});