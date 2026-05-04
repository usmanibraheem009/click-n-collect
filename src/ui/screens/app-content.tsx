import { setAuthChecked } from "@/src/redux/slices/authSlice";
import { RootState } from "@/src/redux/store/myStore";
import { NotoSerif_400Regular, NotoSerif_500Medium, NotoSerif_600SemiBold, NotoSerif_700Bold, NotoSerif_800ExtraBold, useFonts } from '@expo-google-fonts/noto-serif';
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const AppContent = () => {

    const user = useSelector((state: RootState) => state.authreducer.user);
    const authChecked = useSelector((state: RootState) => state.authreducer.isAuthChecked);
    const dispatch = useDispatch();
    const [splashReady, setSplashReady] = useState(false);

    const [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_500Medium,
        NotoSerif_600SemiBold,
        NotoSerif_700Bold,
        NotoSerif_800ExtraBold
    })

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

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) return null;

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