import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import ScreenLoader from "@components/common/ScreenLoader";
import CustomRefreshControl from "@components/common/CustomRefreshControl";
import Carousel from "../components/Carousel";
import LatestReports from "../components/LatestReports";
import { useHomeReports } from "../hooks/useHomeReports";

interface HomeViewProps {
  openDetail: (item: ReportItem) => void;
  jumpTo: (key: string) => void;
}

const HomeView = ({ openDetail, jumpTo }: HomeViewProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { reports, isLoading, error, mutate } = useHomeReports();

  const onRefresh = async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  };

  if (isLoading && reports.length === 0) {
    return <ScreenLoader />;
  }

  if (error && reports.length === 0) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.error }}>Gagal memuat data laporan</Text>
      </View>
    );
  }

  const carouselItems = reports.slice(0, 3);
  const latestReports = reports.slice(0, 5); // display up to 5 latest

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <CustomRefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
        />
      }
    >
      <Carousel items={carouselItems} openDetail={openDetail} />
      <LatestReports items={latestReports} openDetail={openDetail} jumpTo={jumpTo} />

      {/* Bottom Spacer */}
      <View className="h-4" />
    </ScrollView>
  );
};

export default HomeView;

