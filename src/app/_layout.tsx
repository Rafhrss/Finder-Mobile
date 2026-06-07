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

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AuthProvider>
        <ThemeProvider
          value={{
            ...DarkTheme,
            colors: { ...DarkTheme.colors, background: theme.colors.background },
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
