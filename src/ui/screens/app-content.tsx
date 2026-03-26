import { setAuthChecked } from '@/src/redux/slices/authSlice';
import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppContent = () => {

    const user = useSelector((state: any) => state.authReducer.user);
    const authChecked = useSelector((state: any) => state.authReducer.isAuthChecked);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthChecked(true)); 
    }, []);

    useEffect(() => {
        if(!authChecked) return;

        if(user){
            router.replace('/(tabs)');
        }else{
            router.replace('/screens/signup-screen');
        }
    }, [user, authChecked]);

    return ( 
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="screens" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AppContent