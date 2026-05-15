import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import React, { useState } from "react";
import { View } from "react-native";
import { BottomNavigation } from "react-native-paper";

import ChatScreen from "@/src/app/chat";
import HomeScreen from "@/src/app/home";
import ProfileScreen from "@/src/app/profile";
import ReportScreen from "@/src/app/report";
import SearchScreen from "@/src/app/search";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

type RouteItem = {
  key: string;
  title?: string;
  focusedIcon?: IconName;
  unfocusedIcon?: IconName;
};

const routeScreen: RouteItem[] = [
  {
    key: "home",
    title: "Beranda",
    focusedIcon: "home",
    unfocusedIcon: "home-outline",
  },
  {
    key: "search",
    title: "Pencarian",
    focusedIcon: "magnify",
  },
  {
    key: "report",
    focusedIcon: "plus",
    unfocusedIcon: "plus",
  },
  {
    key: "chat",
    title: "Chat",
    focusedIcon: "chat",
    unfocusedIcon: "chat-outline",
  },
  {
    key: "profile",
    title: "Profil",
    focusedIcon: "account",
    unfocusedIcon: "account-outline",
  },
];

const MainBottomNavigation = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(routeScreen);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    report: ReportScreen,
    chat: ChatScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={({ route, focused, color }) => {
        const iconName = focused
          ? route.focusedIcon
          : (route.unfocusedIcon ?? route.focusedIcon);

        if (route.key === "report") {
          return (
            <View
              className="-mt-3 h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={30}
                color={theme.colors.background}
              />
            </View>
          );
        }

        return (
          <MaterialCommunityIcons name={iconName} size={28} color={color} />
        );
      }}
      activeIndicatorStyle={{ backgroundColor: "transparent" }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      barStyle={{
        backgroundColor: theme.colors.surfaceVariant,
        borderTopColor: theme.colors.outlineVariant,
        borderTopWidth: 1,
      }}
    />
  );
};

export default MainBottomNavigation;
