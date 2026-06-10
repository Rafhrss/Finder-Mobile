import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Animated, DeviceEventEmitter, View } from "react-native";
import { BottomNavigation } from "react-native-paper";

import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import { useAuth } from "../../contexts/AuthContext";

import ChatScreen from "@/src/app/(tabs)/chat";
import HomeScreen from "@/src/app/(tabs)/home";
import ProfileScreen from "@/src/app/(tabs)/profile";
import ReportScreen from "@/src/app/(tabs)/report";
import SearchScreen from "@/src/app/(tabs)/search";

import { ReportDetailOverlay } from "./ReportDetailOverlay";
import { routeScreen } from "./utils/navigation.constants";
import { RouteItem } from "./utils/navigation.types";

const MainBottomNavigation = () => {
  const { userToken } = useAuth();
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

  // Listen to external tab switch events
  useEffect(() => {
    const sub = DeviceEventEmitter.addListener("JUMP_TO_TAB", (routeKey) => {
      const newIndex = routes.findIndex((r) => r.key === routeKey);
      if (newIndex >= 0) setIndex(newIndex);
    });
    return () => sub.remove();
  }, [routes]);

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      const selectedRoute = routes[newIndex].key;
      const requiresAuth =
        selectedRoute === "report" || selectedRoute === "chat";

      if (requiresAuth && !userToken) {
        Alert.alert(
          "Akses Ditolak",
          "Anda harus login terlebih dahulu untuk mengakses halaman ini.",
        );
        const profileIndex = routes.findIndex((r) => r.key === "profile");
        setIndex(profileIndex);
      } else {
        setIndex(newIndex);
      }
    },
    [routes, userToken],
  );

  const renderScene = useCallback(
    ({
      route,
      jumpTo,
    }: {
      route: RouteItem;
      jumpTo: (key: string) => void;
    }) => {
      switch (route.key) {
        case "home":
          return <HomeScreen jumpTo={jumpTo} openDetail={openDetail} />;
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
    },
    [openDetail],
  );

  const renderIcon = useCallback(
    ({
      route,
      focused,
      color,
    }: {
      route: RouteItem;
      focused: boolean;
      color: string;
    }) => {
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
              name={iconName as any}
              size={30}
              color={theme.colors.background}
            />
          </View>
        );
      }

      return (
        <MaterialCommunityIcons
          name={iconName as any}
          size={28}
          color={color}
        />
      );
    },
    [],
  );

  return (
    <View className="flex-1">
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleIndexChange}
        renderScene={renderScene as any}
        renderIcon={renderIcon as any}
        activeIndicatorStyle={{ backgroundColor: "transparent" }}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.onSurfaceVariant}
        barStyle={{
          backgroundColor: theme.colors.surfaceVariant,
          borderTopColor: theme.colors.outlineVariant,
          borderTopWidth: 1,
        }}
      />

      <ReportDetailOverlay
        detailItem={detailItem}
        slideAnim={slideAnim}
        closeDetail={closeDetail}
      />
    </View>
  );
};

export default MainBottomNavigation;
