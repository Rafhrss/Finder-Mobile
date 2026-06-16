import loadingGif from "@assets/loader/loading-image.gif";
import React from "react";
import { Image, View } from "react-native";

const ButtonLoader = () => {
  return (
    <View className="items-center justify-center" style={{ backgroundColor: "transparent" }}>
      <Image
        source={loadingGif}
        style={{ width: 24, height: 24 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default React.memo(ButtonLoader);
