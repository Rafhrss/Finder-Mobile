import React, { useEffect } from "react";
import { Animated, BackHandler } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import ReportDetailView from "@screens/report/views/ReportDetailView";

type ReportDetailOverlayProps = {
  detailItem: ReportItem | null;
  slideAnim: Animated.Value;
  closeDetail: () => void;
  withSafeArea?: boolean;
};

export const ReportDetailOverlay = ({
  detailItem,
  slideAnim,
  closeDetail,
  withSafeArea = false,
}: ReportDetailOverlayProps) => {
  const insets = useSafeAreaInsets();

  // Intercept Android hardware back button when detail is open
  useEffect(() => {
    if (!detailItem) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        closeDetail();
        return true; // Prevent default (exit app)
      },
    );

    return () => backHandler.remove();
  }, [detailItem, closeDetail]);

  if (!detailItem) return null;

  return (
    <Animated.View
      className="absolute inset-0"
      style={{
        backgroundColor: theme.colors.background,
        transform: [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 400],
            }),
          },
        ],
      }}
    >
      <ReportDetailView reportId={detailItem.id} initialItem={detailItem} onBack={closeDetail} withSafeArea={withSafeArea} />
    </Animated.View>
  );
};
