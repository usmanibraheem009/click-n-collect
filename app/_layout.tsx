import MyStore, { persistor } from "@/src/redux/store/myStore";
import AppContent from "@/src/ui/screens/app-content";
import Snackbar from "@/src/utils/snackBar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={MyStore}>
      <PersistGate persistor={persistor} loading={null} >
        <GestureHandlerRootView>
          <AppContent />
          <Snackbar />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}