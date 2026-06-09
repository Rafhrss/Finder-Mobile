import { theme } from "@/src/libs/theme";
import React from "react";
import { ActivityIndicator, View } from "react-native";

interface LoadingOverlayProps {
  size?: "small" | "large";
  color?: string;
  transparent?: boolean;
}

const LoadingOverlay = ({
  size = "large",
  color = theme.colors.primary,
  transparent = false,
}: LoadingOverlayProps) => {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: transparent ? "transparent" : theme.colors.background,
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingOverlay;
