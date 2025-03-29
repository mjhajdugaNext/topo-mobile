import { View, StatusBar, NativeModules } from "react-native";
import useStatusBarHeight from "../hooks/useStatusBarHeight";
import colors from "../enums/colors";
const { StatusBarManager } = NativeModules;

export default function ScreenView({ children }) {
  const statusBarHeight = useStatusBarHeight();
  console.log('statusBar', statusBarHeight)
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: statusBarHeight + 24,
        paddingBottom: 24,
        backgroundColor: colors.backgroundGray
      }}
    >
      {children}
    </View>
  );
}
