import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

export type RouteItem = {
  key: string;
  title?: string;
  focusedIcon?: IconName;
  unfocusedIcon?: IconName;
};
