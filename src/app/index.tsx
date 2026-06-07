import MainAppbar from "@/src/components/layout/MainAppbar";
import MainBottomNavigation from "@/src/components/layout/MainBottomNavigation";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-[#060E17]">
      <MainAppbar />
      <MainBottomNavigation />
    </View>
  );
}
