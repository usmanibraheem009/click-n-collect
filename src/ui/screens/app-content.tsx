import { setAuthChecked } from "@/src/redux/slices/authSlice";
import { RootState } from "@/src/redux/store/myStore";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const AppContent = () => {

    const user = useSelector((state: RootState) => state.authreducer.user);
    const authChecked = useSelector((state: RootState) => state.authreducer.isAuthChecked);
    const dispatch = useDispatch();
    const [splashReady, setSplashReady] = useState(false);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setSplashReady(true);
        }, 3000);

        dispatch(setAuthChecked(true));

        return () => clearTimeout(splashTimer);
    }, []);

    useEffect(() => {
        if (!authChecked || !splashReady) return;

        if (user) {
            router.replace('/(tabs)');
        } else {
            router.replace('/screens/signup-screen');
        }
    }, [user, authChecked, splashReady]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="screens" options={{ headerShown: false }} />
            </Stack>
        </GestureHandlerRootView>
    )
}

export default AppContent;