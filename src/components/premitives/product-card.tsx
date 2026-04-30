import { useTheme } from '@/src/hooks/useTheme'
import { addToCart } from '@/src/redux/slices/cartSlice'
import { toggleFavorites } from '@/src/redux/slices/favouriteSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
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
    showDetails?: boolean,
    showCartButton?: boolean
}

const ProductCard: React.FC<Props> = ({ item, onPress, showDetails = false, showCartButton = false }) => {

    const favorites = useSelector((state: RootState) => state.favoritesreducer.favorites);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();
    const isFavorite = favorites.some((fav: any) => fav.id == item.id);

    const handleFavoriteToggle = () => dispatch(toggleFavorites(item));
    const handleAddToCart = () => dispatch(addToCart(item));

    return (
        <TouchableOpacity style={[styles.productContainer, { backgroundColor: theme.surface.secondary }]}
            onPress={() => onPress(item)}
            activeOpacity={0.9}
        >
            <View style={[styles.imageContainer, { backgroundColor: theme.surface.secondary }]}>
                <Image source={{ uri: item.image }} style={styles.imageStyle} />

                {showCartButton ? (
                    <TouchableOpacity style={[styles.fvrtBtn, { backgroundColor: theme.background.primary }]}
                        onPress={handleAddToCart}
                        activeOpacity={0.85}
                    >
                        <Fontisto name='shopping-bag' size={mS(14)} color={'white'} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.fvrtBtn, { backgroundColor: theme.background.primary }]}
                        onPress={handleFavoriteToggle}
                        activeOpacity={0.85} >
                        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'}
                            color={isFavorite ? theme.surface.primary : theme.text.disabled}
                            size={mS(20)} />
                    </TouchableOpacity>
                )}

                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>NEW</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.categoryText, { color: theme.text.disabled }]} numberOfLines={1}>{item.category.toUpperCase()}</Text>

                <Text style={[styles.titleText, { color: theme.text.primary }]} numberOfLines={2} ellipsizeMode="tail">{item.title} </Text>

                {showDetails && (
                    <View style={styles.details}>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, { color: theme.text.disabled }]}>Color</Text>
                            <Text style={[styles.detailValue, { color: theme.text.primary }]}>{item.color}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, { color: theme.text.disabled }]}>Size</Text>
                            <Text style={[styles.detailValue, { color: theme.text.primary }]}>{item.size}</Text>
                        </View>
                    </View>
                )}

                <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    productContainer: {
        width: mS(200),
        borderRadius: mS(20),
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        marginRight: mS(25),
        marginVertical: mVs(10)
    },
    imageContainer: {
        height: mVs(180),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageStyle: {
        height: '85%',
        width: '85%',
        resizeMode: 'contain',
    },
    fvrtBtn: {
        position: 'absolute',
        top: mVs(10),        // 👈 top right over image
        right: mS(10),
        height: mS(34),
        width: mS(34),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        zIndex: 2,
        borderRadius: mS(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeContainer: {
        position: 'absolute',
        top: mVs(10),
        left: mS(10),
        backgroundColor: '#FF4B4B',
        borderRadius: mS(6),
        paddingHorizontal: mS(7),
        paddingVertical: mVs(3),
    },
    badgeText: {
        color: 'white',
        fontSize: mS(9),
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    infoContainer: {
        padding: mS(10),
        gap: mVs(4),
    },
    categoryText: {
        fontSize: mS(10),
        fontWeight: '600',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    titleText: {
        fontSize: mS(13),
        fontWeight: '600',
        lineHeight: mVs(18),
    },
    priceText: {
        fontSize: mS(14),
        color: '#FF4B4B',
        fontWeight: '700',
        marginTop: mVs(2),
    },
    details: {
        gap: mVs(3),
    },
    detailRow: {
        flexDirection: 'row',
        gap: mS(6),
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: mS(11),
        fontWeight: '500',
    },
    detailValue: {
        fontSize: mS(11),
        fontWeight: '600',
    },
})