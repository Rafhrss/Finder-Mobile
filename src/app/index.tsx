import { Redirect } from "expo-router";

export default function Index() {
  return (
    // <View className="flex-1 bg-[#060E17]">
    //   <MainAppbar />
    //   <MainBottomNavigation />
    // </View>
    <Redirect href="/login" />
  );
}
