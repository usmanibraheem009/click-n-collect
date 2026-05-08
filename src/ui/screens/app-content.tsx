import { loadSessionFromStore, setLoggedIn } from "@/src/redux/slices/authSlice";
import { RootState } from "@/src/redux/store/myStore";
import { NotoSerif_400Regular, NotoSerif_500Medium, NotoSerif_600SemiBold, NotoSerif_700Bold, NotoSerif_800ExtraBold, useFonts } from '@expo-google-fonts/noto-serif';
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const AppContent = () => {
    const isLoggedIn = useSelector((state: RootState) => state.authreducer.isLoggedIn);
    const dispatch = useDispatch();
    const [authReady, setAuthReady] = useState(false);

    const [fontsLoaded] = useFonts({
        regular: NotoSerif_400Regular,
        medium: NotoSerif_500Medium,
        semibold: NotoSerif_600SemiBold,
        bold: NotoSerif_700Bold,
        extraBold: NotoSerif_800ExtraBold,
    });

    useEffect(() => {
        const bootstrap = async () => {
            const hasSession = await loadSessionFromStore();
            if (hasSession) dispatch(setLoggedIn());
            setAuthReady(true);
        };
        bootstrap();
    }, []);

    useEffect(() => {
        if (!fontsLoaded || !authReady) return;

        SplashScreen.hideAsync();

        if (isLoggedIn) {
            router.replace('/(tabs)');
        } else {
            router.replace('/screens/login-screen');
        }
    }, [fontsLoaded, authReady]);

    if (!fontsLoaded || !authReady) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="screens" options={{ headerShown: false }} />
            </Stack>
        </GestureHandlerRootView>
    );
};

export default AppContent;