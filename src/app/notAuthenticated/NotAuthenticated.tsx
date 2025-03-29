import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NonAuthenticatedScreens } from "@/src/shared/enums/shared.interface";
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();


function ForgotPassowrdScreen() {
  return (
    <View>
      <Text>ForgotPassowrd</Text>
    </View>
  );
}

export default function NotAuthenticated() {
  console.log('rendering nonAuthenticatedModule')
  return (
    <Stack.Navigator
      initialRouteName={NonAuthenticatedScreens.Login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={NonAuthenticatedScreens.Login}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NonAuthenticatedScreens.ForgotPassword}
        component={ForgotPassowrdScreen}
      />
    </Stack.Navigator>
  );
}
