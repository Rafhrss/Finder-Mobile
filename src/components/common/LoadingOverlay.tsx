import { theme } from "@/src/libs/theme";
import loadingGif from "@assets/lottie/loader.gif";
import React from "react";
import { Image, View } from "react-native";

interface LoadingOverlayProps {
  size?: "small" | "large";
  color?: string;
  transparent?: boolean;
}

const LoadingOverlay = ({
  size = "large",
  transparent = false,
}: LoadingOverlayProps) => {
  const dimension = size === "small" ? 24 : 100;

  return (
    <View
      className={
        size === "large"
          ? "flex-1 items-center justify-center"
          : "items-center justify-center"
      }
      style={{
        backgroundColor: transparent
          ? "transparent"
          : size === "large"
            ? theme.colors.background
            : "transparent",
      }}
    >
      <Image
        source={loadingGif}
        style={{ width: dimension, height: dimension }}
        resizeMode="contain"
      />
    </View>
  );
};

export default React.memo(LoadingOverlay);
