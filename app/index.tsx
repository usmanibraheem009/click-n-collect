import SplashScreen from "@/src/ui/screens/splash-screen";
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useEffect } from "react";


ExpoSplashScreen.preventAutoHideAsync();

export default function Index() {

  useEffect(() => {
    ExpoSplashScreen.hideAsync();
  }, []);

  return (
    <SplashScreen />
  );
}
