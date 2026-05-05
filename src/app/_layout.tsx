import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="report"
        options={{
          title: "Buat Laporan",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
