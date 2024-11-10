// import { Provider as ReduxProvider } from "react-redux";
// import { persistor, store } from "./configureStore";
// import { StyleSheet, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { PersistGate } from "redux-persist/integration/react";
// import { navigationRef } from "../shared/utils/rootNavigation";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { NotifierWrapper } from "react-native-notifier";
// import { MainScreens } from "@/shared/enums/shared.interface";
// import LoginScreen from "./notAuthenticated/LoginScreen";
// import HomeScreen from "./authenticated/HomeScreen";

// const Stack = createNativeStackNavigator();

// function Content() {
//   const isAuthenticated = false;
//   const initialRouteName = isAuthenticated
//     ? MainScreens._Home
//     : MainScreens.Login;

//   return (
//     <NavigationContainer ref={navigationRef} independent={true}>
//       <Stack.Navigator
//         initialRouteName={initialRouteName}
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name={MainScreens.Login} component={LoginScreen} />
//         <Stack.Screen name={MainScreens._Home} component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <ReduxProvider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <GestureHandlerRootView style={{ flex: 1 }}>
//           <NotifierWrapper>
//             <Content />
//           </NotifierWrapper>
//         </GestureHandlerRootView>
//       </PersistGate>
//     </ReduxProvider>
//   );
// }
