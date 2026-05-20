import useGreetings from '@/src/hooks/useGreeetings';
import { useTheme } from '@/src/hooks/useTheme';
import { RootState } from '@/src/redux/store/myStore';
import { mS, mVs } from '@/src/utils/scale';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const DashHeader = () => {

    const greetings = useGreetings();
    const { theme } = useTheme();
    const { user } = useSelector((state: RootState) => state.userreducer);

    const onRefresh = () => {

    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.greetings, { color: theme.text.secondary }]}>{greetings} ,</Text>
                <Text style={[styles.userName, { color: theme.text.primary }]}>{user?.fullName}</Text>
            </View>
            <Pressable style={[styles.refresh, { backgroundColor: theme.background.tertiary, borderColor: theme.border.tertiary }]} onPress={() => { }}>
                <Ionicons name='repeat' size={mS(26)} color={theme.text.secondary} />
            </Pressable>
        </View>
    )
}

export default DashHeader

const styles = StyleSheet.create({
    container: {
        height: mVs(50),
        marginTop: mVs(10),
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    greetings: {
        fontSize: mS(18),
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    userName: {
        fontSize: mS(26),
        fontWeight: '500',
    },
    refresh: {
        height: mS(50),
        width: mS(50),
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: "center"
    }
})