import { theme } from "@/src/libs/theme";
import loadingGif from "@assets/loader/loader.gif";
import React from "react";
import { Image, View } from "react-native";

interface ScreenLoaderProps {
  transparent?: boolean;
}

const ScreenLoader = ({ transparent = false }: ScreenLoaderProps) => {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: transparent ? "transparent" : theme.colors.background,
      }}
    >
      <Image
        source={loadingGif}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default React.memo(ScreenLoader);
