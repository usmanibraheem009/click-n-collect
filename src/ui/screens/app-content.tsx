import useBootstrapAuth from "@/src/hooks/useBootstrapAuth";
import { RootState } from "@/src/redux/store/myStore";
import { NotoSerif_400Regular, NotoSerif_500Medium, NotoSerif_600SemiBold, NotoSerif_700Bold, NotoSerif_800ExtraBold, useFonts } from '@expo-google-fonts/noto-serif';
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AppContent = () => {

    const { bootstrapping } = useBootstrapAuth();

    const { isLoggedIn } = useSelector(
        (state: RootState) => state.authreducer
    );

    const user = useSelector(
        (state: RootState) => state.userreducer.user
    );

    const [fontsLoaded] = useFonts({
        regular: NotoSerif_400Regular,
        medium: NotoSerif_500Medium,
        semibold: NotoSerif_600SemiBold,
        bold: NotoSerif_700Bold,
        extraBold: NotoSerif_800ExtraBold,
    });

    useEffect(() => {

        if (!fontsLoaded || bootstrapping) return;

        if (!isLoggedIn) {
            router.replace('/screens/login-screen');
            return;
        }

        if (!user) return;

        if (user.role === 'ADMIN') {
            router.replace('/(admin)');
        } else {
            router.replace('/(tabs)');
        }

    }, [fontsLoaded, bootstrapping, isLoggedIn, user]);

    if (!fontsLoaded || bootstrapping) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(admin)" />
            <Stack.Screen name="screens" />
        </Stack>
    );
};

export default AppContent