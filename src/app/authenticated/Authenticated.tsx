import React from "react";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import CustomDrawerContent from "./components/DrawerContent";
import HomeTabsNavigator from "./components/HomeTabsNavigator";
import colors from "../../shared/enums/colors";
import { AuthenticatedScreens } from "@/src/shared/enums/shared.interface";

const Drawer = createDrawerNavigator();

interface DrawerButtonProps {
  navigation: DrawerNavigationProp<ParamListBase>;
}

function DrawerButton({ navigation }: DrawerButtonProps) {
  return (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => {
        try {
          // Use the drawer context directly
          if (navigation && typeof navigation.openDrawer === 'function') {
            navigation.openDrawer();
          }
        } catch (error) {
          console.log('Error opening drawer:', error);
        }
      }}
    >
      <Ionicons name="menu" size={28} color="white" />
    </TouchableOpacity>
  );
}

interface AuthenticatedProps {
  navigation: DrawerNavigationProp<ParamListBase>;
}

export default function Authenticated({ navigation }: AuthenticatedProps) {
  console.log('rendering Authenticated module')
  return (
    <Drawer.Navigator
      initialRouteName={AuthenticatedScreens.Home}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.darkBlue,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: (props) => <DrawerButton navigation={navigation} />,
        drawerLabelStyle: {
          color: "white",
          fontSize: 16,
        },
        drawerStyle: {
          backgroundColor: colors.darkBlue,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} stackNavigation={navigation} />
      )}
    >
      <Drawer.Screen 
        name={AuthenticatedScreens.Home} 
        component={HomeTabsNavigator}
        options={{
          title: "Topo Mobile",
          headerShown: false, // Hide the header to avoid duplicate headers
        }}
      />
    </Drawer.Navigator>
  );
}
