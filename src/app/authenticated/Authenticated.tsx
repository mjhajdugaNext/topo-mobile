import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import CustomDrawerContent from "./DrawerContent";
import TabBar from "./TabBar";
import colors from "../../shared/enums/colors";

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function EmptyComponent() {
  return <View />;
}

function SearchScreen() {
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
}

function HomeScreen(): JSX.Element {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
    >
      <Tab.Screen name="Search screen" component={SearchScreen} />
      <Tab.Screen
        name="Drawer"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        component={EmptyComponent}
      />
    </Tab.Navigator>
  );
}

export default function Authenticated({ navigation }) {
  console.log('rendering Authenticated module')
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          color: "white",
          fontFamily: "Wimba",
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
      <Drawer.Screen name={'Home'} component={HomeScreen} />
    </Drawer.Navigator>
  );
}
