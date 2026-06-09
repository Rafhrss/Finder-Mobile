import React from "react";
import { RefreshControl, RefreshControlProps } from "react-native";
import { theme } from "@libs/theme";

interface CustomRefreshControlProps extends RefreshControlProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const CustomRefreshControl = (props: CustomRefreshControlProps) => {
  return (
    <RefreshControl
      tintColor={theme.colors.primary}
      colors={[theme.colors.primary]}
      {...props}
    />
  );
};

export default CustomRefreshControl;
