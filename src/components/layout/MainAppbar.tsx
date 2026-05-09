import React from "react";
import { View } from "react-native";
import { Appbar, Avatar, useTheme } from "react-native-paper";

const MainAppbar = () => {
  const { colors } = useTheme();

  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: colors.surfaceVariant }}
    >
      <View className="ml-3 mr-2.5">
        <Avatar.Image size={34} source={require("@assets/images/icon.png")} />
      </View>
      <Appbar.Content title="FINDER" color={colors.onSurfaceVariant} />
      <View className="mr-3">
        <Avatar.Icon size={34} icon="account" />
      </View>
    </Appbar.Header>
  );
};

export default MainAppbar;
