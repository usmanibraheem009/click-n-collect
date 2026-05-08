import { useTheme } from '@/src/hooks/useTheme';
import { RootState } from '@/src/redux/store/myStore';
import { mS, mVs } from '@/src/utils/scale';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';


const UserCard = () => {
    const user = useSelector((state: RootState) => state.authreducer.user);
    const { theme } = useTheme();

    return (
        <View style={[styles.userCard, { borderColor: theme.border.secondary }]}>
            <View style={[styles.imageContainer, { backgroundColor: theme.background.secondary }]}>
                <Ionicons name='person' size={32} color={theme.text.primary} />
            </View>
            <View>
                <Text style={[styles.userName, { color: theme.text.primary }]}>{user?.name}</Text>
                <Text style={{ fontSize: 12, fontWeight: '500', color: theme.text.secondary }}>{user?.email}</Text>
            </View>
        </View>
    )
}

export default UserCard

const styles = StyleSheet.create({
    userCard: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: mVs(20),
        borderWidth: 1.5,
        borderRadius: mS(10),
    },
    imageContainer: {
        height: mVs(64),
        width: mVs(64),
        borderRadius: mS(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: mS(18),
        fontFamily: 'regular'
    }
})