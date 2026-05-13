import "../../global.css";

// Third-party Import
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

// Libs Import
import { theme } from "@libs/theme";

// Component Import
import MainAppbar from "@/src/components/layout/MainAppbar";
import MainBottomNavigation from "@/src/components/layout/MainBottomNavigation";

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <View className="flex-1 bg-[#060E17]">
        <MainAppbar />
        <MainBottomNavigation />
      </View>
    </PaperProvider>
  );
}
