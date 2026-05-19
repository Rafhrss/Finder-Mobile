import React from "react";
import { Image, View } from "react-native";
import { Appbar, Avatar, useTheme } from "react-native-paper";

const MainAppbar = () => {
  const { colors } = useTheme();

  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: colors.surfaceVariant }}
    >
      <View className="ml-3 mr-2.5">
        <Image
          source={require("@assets/images/icon_3.png")}
          style={{ width: 70, height: 70, resizeMode: "contain" }}
        />
      </View>
      <Appbar.Content title="FINDER" color={colors.onSurfaceVariant} />
      <View className="mr-3">
        <Avatar.Icon size={34} icon="account" />
      </View>
    </Appbar.Header>
  );
};

export default MainAppbar;
