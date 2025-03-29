import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, View } from "react-native";
import colors from "@/src/shared/enums/colors";

export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const handleLogout = () => {};

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} labelStyle={{ color: colors.paleWhite }} />
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
          labelStyle={{ color: "white", fontFamily: "Wimba", fontSize: 16 }}
        />
      </DrawerContentScrollView>
    </View>
  );
}
