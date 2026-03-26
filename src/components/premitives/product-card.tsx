import { addToCart } from '@/src/redux/slices/cartSlice'
import { toggleFavorites } from '@/src/redux/slices/favouriteSlice'
import StarRating from '@/src/ui/screens/review-stars'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

type product = {
    id: number,
    title: string,
    category: string,
    price: number,
    image: string,
    color: string,
    size: string,
};

type Props = {
    item: product,
    onPress: (item: product) => void,
    showRating: boolean,
    showDetails?: boolean,
    showCartButton?: boolean
}

const ProductCard: React.FC<Props> = ({ item, onPress, showRating = true, showDetails = false, showCartButton = false }) => {

    const favorites = useSelector((state: any) => state.favoritesReducer.favorites);
    const dispatch = useDispatch();
    const isFavorite = favorites.some((fav: any) => fav.id == item.id);
    const handleFavoriteToggle = () => {
        dispatch(toggleFavorites(item));
    }
    const handleAddToCart = () => {
        dispatch(addToCart(item));
    }

    return (
        <TouchableOpacity style={styles.productContainer} onPress={() => { onPress(item) }}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.imageStyle} />
            </View>
            {showCartButton ? (
                <TouchableOpacity style={[styles.fvrtBtn, {backgroundColor: 'red'}]} onPress={handleAddToCart}>
                    <Fontisto name= 'shopping-bag' size={18} color={'white'} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.fvrtBtn} onPress={handleFavoriteToggle}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? 'red' : 'transparent'} size={24} />
                </TouchableOpacity>
            )}
            
            {showRating && (
                <StarRating onRate={(rate: any) => { console.log(rate) }} />
            )}
            <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
            </Text>
            <Text style={styles.categoryText}> {item.category} </Text>
            {showDetails && (
                <View style={styles.details}>
                    <Text style={{ color: 'grey' }}>Color:</Text>
                    <Text>{item.color}</Text>
                    <Text style={{ color: 'grey' }}>Size:</Text>
                    <Text> {item.size}</Text>
                </View>
            )}
            <Text style={styles.priceText}>{item.price}$</Text>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
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
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})