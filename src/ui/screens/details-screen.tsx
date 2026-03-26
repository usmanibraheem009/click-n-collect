import ScreenHeader from '@/src/components/layout/screen-header'
import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import ColorModal from '@/src/components/modals/color-modal'
import SizeModal from '@/src/components/modals/size-modal'
import DropDown from '@/src/components/premitives/drop-down'
import SimpleButton from '@/src/components/premitives/simple-button'
import useTheme from '@/src/hooks/useTheme'
import { addToCart } from '@/src/redux/slices/cartSlice'
import { toggleFavorites } from '@/src/redux/slices/favouriteSlice'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from './review-stars'

const DetailsScreen = () => {

    const { theme } = useTheme();
    const { name, price, category, image, description, id } = useLocalSearchParams();
    const favorites = useSelector((state:any) => state.favoritesReducer.favorites);
    const dispatch = useDispatch();

    const [sizeModalVisible, setSizeModalVisible] = useState(false);
    const [colorModalVisible, setColorModalVisible] = useState(false);

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Red', 'Blue', 'Green', 'White', 'Black'];

    const isFavorite = favorites.some((fav:any) => fav.id == Number(id));

    const handleAddToCart = () => {

        if(!selectedColor){
            Alert.alert('Please select a color')
        }
        if(!selectedSize){
            Alert.alert('Please select a size')
        }
        dispatch(addToCart(productItem))
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
        <ScreenWrapper backgroundColor={theme.background.primary} scrollable safeArea>
            <ScreenHeader backArrow shareIcon title={category as string} />
            <View style={{ height: 320, width: '100%', flex: 1 }}>
                <Image source={{ uri: image as string }} style={styles.prodImage} />
            </View>
            <View style={styles.dropDown}>
                <DropDown btnText={selectedSize || 'Size'} onPress={() => { setSizeModalVisible(true) }} />
                <DropDown btnText={selectedColor || 'Color'} onPress={() => { setColorModalVisible(true) }} />

                <TouchableOpacity style={styles.fvrtBtn} onPress={() => dispatch(toggleFavorites({ title: name, price, category, image, description, id: Number(id) }))}>
                    <Ionicons name={isFavorite? 'heart' :'heart-outline'} color={isFavorite? 'red': 'transparent'} size={24} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '96%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={[styles.bodyText, { color: 'grey' }]}>{category}</Text>
                    <StarRating onRate={(value: any) => { console.log('user rated: ', value) }} />
                </View>
                <Text style={styles.title}>{price}$</Text>
            </View>
            <Text style={styles.bodyText}>{description}</Text>

            <View style={{ marginTop: 30 }} />
            <SimpleButton btnText='ADD TO CART' onPress={handleAddToCart} disabled={!selectedColor || !selectedSize}/>

            <SizeModal visible={sizeModalVisible}  onSelect={(size) => {console.log('selected Size:', size); setSelectedSize(size)}} onClose={() => setSizeModalVisible(false)} sizes={sizes} />
            <ColorModal visible={colorModalVisible} onSelect={(color) => {console.log('selected color:', color); setSelectedColor(color)}} onClose={() => setColorModalVisible(false)} colors={colors} />
        </ScreenWrapper>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
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
        fontSize: 24,
        fontWeight: 500,
        maxWidth: '80%'
    },
    bodyText: {
        fontSize: 14,
        fontWeight: 400,
    },
    prodImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'

    }
})