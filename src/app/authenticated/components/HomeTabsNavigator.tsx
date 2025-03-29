import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '@/src/shared/enums/colors';

// Import screens
import HomeScreen from '@/src/screens/home/HomeScreen';
import CragsScreen from '@/src/screens/crags/CragsScreen';
import RoutesScreen from '@/src/screens/routes/RoutesScreen';
import AboutScreen from '@/src/screens/about/AboutScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabsNavigator(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'Crags') {
            return <FontAwesome5 name="mountain" size={size} color={color} />;
          } else if (route.name === 'Routes') {
            return <FontAwesome5 name="route" size={size} color={color} />;
          } else if (route.name === 'About') {
            return <Ionicons name="information-circle" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.darkBlue,
        tabBarStyle: {
          backgroundColor: colors.paleWhite,
          borderTopWidth: 1,
          borderTopColor: colors.borderGray,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Crags" component={CragsScreen} />
      <Tab.Screen name="Routes" component={RoutesScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
