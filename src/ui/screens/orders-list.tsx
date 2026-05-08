import LoadingIndicator from '@/src/components/layout/loading-indicator'
import Screen from '@/src/components/layout/screen'
import ScreenHeader from '@/src/components/layout/screen-header'
import { useTheme } from '@/src/hooks/useTheme'
import { fetchOrders } from '@/src/redux/slices/orderSlice'
import { AppDispatch, RootState } from '@/src/redux/store/myStore'
import { mS, mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const STATUS_COLORS: Record<string, string> = {
    Confirmed: '#2DC653',
    Shipped: '#F4A261',
    Delivered: '#3A86FF',
    Cancelled: '#E63946',
}

const OrderListScreen = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { orderList, loading } = useSelector((state: RootState) => state.orderreducer);

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    if (loading) return <LoadingIndicator />;

    return (
        <Screen paddingHorizontal={mS(20)}>
            <ScreenHeader backArrow title='My Orders' />

            <FlatList
                data={orderList}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: mVs(30) }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name='bag-outline' size={mS(60)} color={theme.text.disabled} />
                        <Text style={[styles.emptyTitle, { color: theme.text.primary }]}>No Orders Yet</Text>
                        <Text style={[styles.emptySubtitle, { color: theme.text.secondary }]}>
                            Your order history will appear here
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: theme.surface.secondary, borderColor: theme.border.primary }]}>

                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={[styles.orderId, { color: theme.text.disabled }]}>
                                    #{item.id.slice(0, 8).toUpperCase()}
                                </Text>
                                <Text style={[styles.date, { color: theme.text.disabled }]}>
                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </Text>
                            </View>

                            <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] + '20' }]}>
                                <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[item.status] }]} />
                                <Text style={[styles.statusText, { color: STATUS_COLORS[item.status] }]}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: theme.border.primary }]} />

                        <Text style={[styles.sectionLabel, { color: theme.text.disabled }]}>
                            {item.cartItems?.length} ITEM{item.cartItems?.length !== 1 ? 'S' : ''}
                        </Text>
                        {item.cartItems?.slice(0, 2).map((cartItem: any, index: number) => (
                            <View key={index} style={styles.itemRow}>
                                <Ionicons name='cube-outline' size={mS(14)} color={theme.text.disabled} />
                                <Text style={[styles.itemName, { color: theme.text.secondary }]} numberOfLines={1}>
                                    {cartItem.title}
                                </Text>
                                <Text style={[styles.itemQty, { color: theme.text.disabled }]}>
                                    x{cartItem.quantity}
                                </Text>
                            </View>
                        ))}
                        {item.cartItems?.length > 2 && (
                            <Text style={[styles.moreItems, { color: theme.text.disabled }]}>
                                +{item.cartItems.length - 2} more items
                            </Text>
                        )}

                        {/* Divider */}
                        <View style={[styles.divider, { backgroundColor: theme.border.primary }]} />

                        {/* Footer — Address + Total */}
                        <View style={styles.cardFooter}>
                            <View style={styles.footerLeft}>
                                <Ionicons name='location-outline' size={mS(14)} color={theme.text.disabled} />
                                <Text style={[styles.addressText, { color: theme.text.secondary }]} numberOfLines={1}>
                                    {item.address?.city}, {item.address?.country}
                                </Text>
                            </View>
                            <Text style={[styles.total, { color: theme.surface.primary }]}>
                                ${item.grandTotal?.toFixed(2)}
                            </Text>
                        </View>

                    </View>
                )}
            />
        </Screen>
    )
}

export default OrderListScreen

const styles = StyleSheet.create({
    card: {
        borderRadius: mS(16),
        borderWidth: 1,
        padding: mS(16),
        marginBottom: mVs(14),
        gap: mVs(10),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderId: {
        fontSize: mS(13),
        fontFamily: 'Inter_700Bold',
        letterSpacing: 0.5,
    },
    date: {
        fontSize: mS(11),
        fontFamily: 'Inter_400Regular',
        marginTop: mVs(2),
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: mS(10),
        paddingVertical: mVs(5),
        borderRadius: mS(20),
        gap: mS(5),
    },
    statusDot: {
        height: mS(7),
        width: mS(7),
        borderRadius: mS(10),
    },
    statusText: {
        fontSize: mS(12),
        fontFamily: 'Inter_600SemiBold',
    },
    divider: {
        height: 1,
    },
    sectionLabel: {
        fontSize: mS(10),
        fontWeight: '700',
        letterSpacing: 1,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: mS(8),
        marginTop: mVs(4),
    },
    itemName: {
        flex: 1,
        fontSize: mS(13),
        fontFamily: 'Inter_400Regular',
    },
    itemQty: {
        fontSize: mS(12),
        fontFamily: 'Inter_600SemiBold',
    },
    moreItems: {
        fontSize: mS(11),
        fontFamily: 'Inter_400Regular',
        marginTop: mVs(4),
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: mS(4),
        flex: 1,
    },
    addressText: {
        fontSize: mS(12),
        fontFamily: 'Inter_400Regular',
        flex: 1,
    },
    total: {
        fontSize: mS(16),
        fontFamily: 'Inter_700Bold',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: mVs(100),
        gap: mVs(12),
    },
    emptyTitle: {
        fontSize: mS(20),
        fontFamily: 'Inter_700Bold',
    },
    emptySubtitle: {
        fontSize: mS(14),
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
})