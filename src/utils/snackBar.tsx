import React, { useEffect } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../redux/slices/snackbarSlice';
import { AppDispatch, RootState } from '../redux/store/myStore';
import { mVs } from './scale';

const colors = {
    success: '#2DC653',
    info: '#F4A261',
    error: '#E63946',
    null: '#3333'
};

const Snackbar = () => {

    const dispatch = useDispatch<AppDispatch>();
    const translateY = new Animated.Value(50);
    const { message, type, visible } = useSelector((state: RootState) => state.snackbarreducer);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideSnackbar());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { backgroundColor: colors[type], transform: [{ translateY }] }]}>
            <Text style={styles.text}>{message}</Text>
            <Pressable onPress={() => { dispatch(hideSnackbar()) }}>
                <Text style={[styles.dismiss]}>X</Text>
            </Pressable>
        </Animated.View>
    )
}

export default Snackbar

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: mVs(20),
        left: mVs(20),
        right: mVs(20),
        padding: mVs(15),
        borderRadius: mVs(20),
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: .3,
        textShadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        opacity: .8,

    },
    dismiss: {
        fontWeight: '500',
        marginLeft: mVs(10),
        color: '#fff'
    },
    text: {
        flex: 1,
        color: '#fff'
    }
})