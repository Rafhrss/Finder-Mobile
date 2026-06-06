import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/dummyData";
import React, { useState, useCallback, useEffect } from "react";
import { Animated, BackHandler, View } from "react-native";
import { BottomNavigation } from "react-native-paper";

import ChatScreen from "@/src/app/chat";
import HomeScreen from "@/src/app/home";
import ProfileScreen from "@/src/app/profile";
import ReportScreen from "@/src/app/report";
import SearchScreen from "@/src/app/search";
import ReportDetailView from "@screens/report-detail/views";

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
    title: "Cari",
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

  // Detail overlay state
  const [detailItem, setDetailItem] = useState<ReportItem | null>(null);
  const [slideAnim] = useState(new Animated.Value(1));

  const openDetail = useCallback(
    (item: ReportItem) => {
      setDetailItem(item);
      slideAnim.setValue(1);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    },
    [slideAnim],
  );

  const closeDetail = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setDetailItem(null);
    });
  }, [slideAnim]);

  // Intercept Android hardware back button when detail is open
  useEffect(() => {
    if (!detailItem) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        closeDetail();
        return true; // Prevent default (exit app)
      },
    );

    return () => backHandler.remove();
  }, [detailItem, closeDetail]);

  const renderScene = ({
    route,
    jumpTo,
  }: {
    route: RouteItem;
    jumpTo: (key: string) => void;
  }) => {
    switch (route.key) {
      case "home":
        return <HomeScreen openDetail={openDetail} />;
      case "search":
        return <SearchScreen jumpTo={jumpTo} openDetail={openDetail} />;
      case "report":
        return <ReportScreen />;
      case "chat":
        return <ChatScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
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

      {/* Detail Overlay — rendered on top, no Stack navigation */}
      {detailItem && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.background,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 400],
                }),
              },
            ],
          }}
        >
          <ReportDetailView item={detailItem} onBack={closeDetail} />
        </Animated.View>
      )}
    </View>
  );
};

export default MainBottomNavigation;
