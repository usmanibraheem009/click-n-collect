import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import ProductCard from '@/src/components/premitives/product-card'
import useTheme from '@/src/hooks/useTheme'
import { setLoading } from '@/src/redux/slices/authSlice'
import { setProductsByCategory } from '@/src/redux/slices/productSlice'
import { getCategories, getProductsByCategory } from '@/src/services/api/product-api'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, SectionList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Index = () => {
  const dispatch = useDispatch();
  const [sections, setSections] = useState<any[]>([]);
  const { theme } = useTheme();
  const favorites = useSelector((state: any) => state.favoritesReducer.favorites);
  console.log('favorites: ',favorites)

  // useEffect(() => {
  //   dispatch(clearFavorites())
  // }, []);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
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
    } catch (error) {
      console.log('fetch error', error);
    } finally {
      dispatch(setLoading(false));
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
    <ProductCard item={item} onPress={handleSubmit} showRating />
  )


  const renderSection = ({ section }: any) => (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.sectionHeader}>{section.title}</Text>
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

  return (
    <ScreenWrapper backgroundColor='white'>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={() => null}
        renderSectionHeader={renderSection}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <Image
            source={require('../../assets/images/banner.png')}
            style={styles.banner}
            resizeMode="cover"
          />
        }
      />
    </ScreenWrapper >
  );
};

export default Index;

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  productContainer: {
    marginRight: 55,
    width: 120,
    gap: 7
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