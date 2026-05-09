import { theme } from "@libs/theme";
import React from "react";
import { BottomNavigation } from "react-native-paper";

type MainBottomNavigationProps = Pick<
  React.ComponentProps<typeof BottomNavigation>,
  "navigationState" | "onIndexChange" | "renderScene"
>;

const MainBottomNavigation = ({
  navigationState,
  onIndexChange,
  renderScene,
}: MainBottomNavigationProps) => {
  return (
    <BottomNavigation
      navigationState={navigationState}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      shifting
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      barStyle={{
        backgroundColor: theme.colors.surfaceVariant,
        borderTopColor: theme.colors.outlineVariant,
        borderTopWidth: 1,
      }}
    />
  );
};

export default MainBottomNavigation;
