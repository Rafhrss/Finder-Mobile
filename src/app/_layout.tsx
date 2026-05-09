import { theme } from "@libs/theme";
import React from "react";
import { View } from "react-native";
import { BottomNavigation, PaperProvider } from "react-native-paper";
import "../../global.css";
import MainAppbar from "../components/layout/MainAppbar";
import MainBottomNavigation from "../components/layout/MainBottomNavigation";
import ChatScreen from "./chat";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
import ReportScreen from "./report";
import SearchScreen from "./search";

export default function RootLayout() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "search",
      title: "Search",
      focusedIcon: "magnify",
      unfocusedIcon: "magnify",
    },
    {
      key: "report",
      title: "Report",
      focusedIcon: "file-document",
      unfocusedIcon: "file-document-outline",
    },
    {
      key: "chat",
      title: "Chat",
      focusedIcon: "chat",
      unfocusedIcon: "chat-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    report: ReportScreen,
    chat: ChatScreen,
    profile: ProfileScreen,
  });

  return (
    <PaperProvider theme={theme}>
      <View className="flex-1 bg-[#060E17]">
        <MainAppbar />
        <MainBottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </View>
    </PaperProvider>
  );
}
