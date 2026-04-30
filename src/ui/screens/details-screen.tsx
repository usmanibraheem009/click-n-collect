import ScreenHeader from '@/src/components/layout/screen-header'
import ScrollScreen from '@/src/components/layout/scroll-screen'
import ColorModal from '@/src/components/modals/color-modal'
import SizeModal from '@/src/components/modals/size-modal'
import DropDown from '@/src/components/premitives/drop-down'
import SimpleButton from '@/src/components/premitives/simple-button'
import { useTheme } from '@/src/hooks/useTheme'
import { addToCart } from '@/src/redux/slices/cartSlice'
import { toggleFavorites } from '@/src/redux/slices/favouriteSlice'
import { showSnackbar } from '@/src/redux/slices/snackbarSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from './review-stars'

const DetailsScreen = () => {

    const { theme } = useTheme();
    const { name, price, category, image, description, id } = useLocalSearchParams();
    const favorites = useSelector((state: RootState) => state.favoritesreducer.favorites);
    const dispatch = useDispatch<AppDispatch>();

    const [sizeModalVisible, setSizeModalVisible] = useState(false);
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Red', 'Blue', 'Green', 'White', 'Black'];

    const isFavorite = favorites.some((fav: any) => fav.id == Number(id));

    const handleAddToCart = () => {

        if (!selectedColor) {
            return Alert.alert('Selection Required', 'Please select a color')
        }
        if (!selectedSize) {
            return Alert.alert('Selection Required', 'Please select a size')
        }
        dispatch(addToCart(productItem));
        dispatch(showSnackbar({ message: 'Item added to cart!', type: 'info' }))
    };

    const productItem = {
        id: Number(id),
        title: name,
        category: category,
        color: selectedColor,
        size: selectedSize,
        price: Number(price),
        image: image,
        description: description
    }


    return (
        <ScrollScreen paddingVertical={10} paddingHorizontal={mVs(20)}>
            <ScreenHeader backArrow shareIcon title={category as string} />

            <View style={styles.imageContainer}>
                <Image source={{ uri: image as string }} style={styles.prodImage} />
            </View>

            <View style={styles.details}>
                <View style={{ gap: mVs(5) }}>
                    <Text style={[styles.categoryText, { color: theme.text.secondary }]}>{category}</Text>
                    <Text style={[styles.title, { color: theme.text.primary }]} numberOfLines={2}>{name}</Text>
                    <StarRating onRate={(value: any) => { console.log('user rated: ', value) }} />
                </View>
                <Text style={[styles.title, { color: theme.text.secondary }]}>{price}$</Text>
            </View>

            <View style={styles.dropDown}>
                <DropDown btnText={selectedSize || 'Size'} onPress={() => { setSizeModalVisible(true) }} />
                <DropDown btnText={selectedColor || 'Color'} onPress={() => { setColorModalVisible(true) }} />

                <TouchableOpacity style={[styles.fvrtBtn, { backgroundColor: '#ffff' }]} onPress={() => dispatch(toggleFavorites({ title: name, price, category, image, description, id: Number(id) }))}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? theme.surface.primary : theme.text.disabled} size={24} />
                </TouchableOpacity>
            </View>

            <Text style={[styles.description, { color: theme.text.primary }]}>Description</Text>
            <Text style={[styles.bodyText, { color: theme.text.secondary }]}>{description}</Text>

            <View style={{ marginTop: 30 }} />
            <SimpleButton btnText='ADD TO CART' onPress={handleAddToCart} />

            <SizeModal visible={sizeModalVisible} onSelect={(size) => { console.log('selected Size:', size); setSelectedSize(size) }} onClose={() => setSizeModalVisible(false)} sizes={sizes} />
            <ColorModal visible={colorModalVisible} onSelect={(color) => { console.log('selected color:', color); setSelectedColor(color) }} onClose={() => setColorModalVisible(false)} colors={colors} />

        </ScrollScreen>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    imageContainer: {
        height: mVs(320),
        width: '100%',
        flex: 1,
        borderRadius: mS(20),
        overflow: 'hidden',
        marginTop: mVs(12),
        marginBottom: mVs(22),
    },
    prodImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    details: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: mS(10)
    },
    dropDown: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 20,
        gap: 10
    },
    fvrtBtn: {
        height: 42,
        width: 42,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: mS(24),
        fontWeight: 500,
        maxWidth: '80%',
    },
    description: {
        fontSize: mS(18),
        fontWeight: '600',
        marginBottom: mVs(8)
    },
    bodyText: {
        fontSize: 14,
        fontWeight: 400,
    },
    categoryText: {
        fontSize: mS(11),
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
})