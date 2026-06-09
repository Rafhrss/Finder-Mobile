import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { Appbar, Avatar, useTheme } from "react-native-paper";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";

const MainAppbar = () => {
  const { colors } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await GoogleSignin.getCurrentUser();
        setUser(userInfo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: colors.surfaceVariant }}
    >
      <View className="ml-1 mr-1">
        <Image
          source={require("@assets/images/icon_3.png")}
          style={{ width: 70, height: 70, resizeMode: "contain" }}
        />
      </View>
      <Appbar.Content
        title="FINDER"
        color={colors.onSurfaceVariant}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
      />
      <View className="mr-3">
        {user?.user?.photo ? (
          <Avatar.Image size={34} source={{ uri: user.user.photo }} />
        ) : (
          <Avatar.Icon size={34} icon="account" />
        )}
      </View>
    </Appbar.Header>
  );
};

export default MainAppbar;
