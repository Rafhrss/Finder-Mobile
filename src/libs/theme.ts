import { configureFonts, MD3DarkTheme } from "react-native-paper";

const fontConfig = {
  fontFamily: "Poppins_300Regular",
};

export const theme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0AF3B9",
    onPrimary: "#00382C",
    primaryContainer: "#014D3D",
    onPrimaryContainer: "#9AFFE1",
    secondaryContainer: "#163248",
    onSecondaryContainer: "#D4FFF2",
    background: "#060E17",
    onBackground: "#E3EEF9",
    surface: "#060E17",
    onSurface: "#E3EEF9",
    surfaceVariant: "#111E2C",
    onSurfaceVariant: "#A8C1DA",
    outline: "#26384A",
    outlineVariant: "#1D2A39",
    elevation: {
      level0: "#060E17",
      level1: "#0A1420",
      level2: "#0E1826",
      level3: "#111E2C",
      level4: "#152334",
      level5: "#192A3D",
    },
  },
};
