import "react-native-gesture-handler";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { persistor, store } from "./configureStore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PersistGate } from "redux-persist/integration/react";
import { navigationRef } from "../shared/utils/rootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotifierWrapper } from "react-native-notifier";
import { MainScreens } from "@/src/shared/enums/shared.interface";
import NotAuthenticated from "./notAuthenticated/NotAuthenticated";
import Authenticated from './authenticated/Authenticated';
import { authSelectors } from "../shared/modules/auth/auth.store";

const Stack = createNativeStackNavigator();

function Content() {

  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  // const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated)
  const initialRouteName = isAuthenticated
    ? MainScreens.Authenticated
    : MainScreens.NotAuthenticated;
    console.log('initialRouteName', initialRouteName)
  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={MainScreens.NotAuthenticated} component={NotAuthenticated} />
        <Stack.Screen name={MainScreens.Authenticated} component={Authenticated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NotifierWrapper>
            <Content />
          </NotifierWrapper>
        </GestureHandlerRootView>
      </PersistGate>
    </ReduxProvider>
  );
}
