import "../../global.css";

// Third-party Import
import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";

// Libs Import
import { theme } from "@libs/theme";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { View } from "react-native";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Regular": PlusJakartaSans_400Regular,
    "PlusJakartaSans-Medium": PlusJakartaSans_500Medium,
    "PlusJakartaSans-SemiBold": PlusJakartaSans_600SemiBold,
    "PlusJakartaSans-Bold": PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AuthProvider>
        <ThemeProvider
          value={{
            ...DarkTheme,
            colors: { ...DarkTheme.colors, background: theme.colors.background },
            fonts: {
              regular: { fontFamily: "PlusJakartaSans-Regular", fontWeight: "normal" },
              medium: { fontFamily: "PlusJakartaSans-Medium", fontWeight: "normal" },
              bold: { fontFamily: "PlusJakartaSans-Bold", fontWeight: "normal" },
              heavy: { fontFamily: "PlusJakartaSans-Bold", fontWeight: "normal" },
            },
          }}
        >
          <PaperProvider theme={theme}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: theme.colors.background },
                animation: "none",
              }}
            />
          </PaperProvider>
        </ThemeProvider>
      </AuthProvider>
    </View>
  );
}
