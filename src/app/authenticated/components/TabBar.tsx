import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import colors from "@/src/shared/enums/colors";

export default function TabBar({ state, descriptors, navigation }) {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible) return null;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === "Drawer") {
            navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            return;
          }

          // TODO: move alret into new navigate method in pets screen
          if (!isFocused) {
            navigation.navigate(route.name, { merge: true });
          }
        };

        if (route.name === "Edit Owner") return null;

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconColor = isFocused ? colors.orange : colors.darkBlue;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.iconContainer}
          >
            {route.name === "Search screen" && (
              <Ionicons name="document" size={32} color={iconColor} />
            )}
            {route.name === "Drawer" && (
              <FontAwesome5 name="bars" size={24} color={iconColor} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    padding: 8,
    backgroundColor: colors.backgroundGray
  },
  iconContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
