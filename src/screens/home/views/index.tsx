import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import LoadingOverlay from "@components/common/LoadingOverlay";
import CustomRefreshControl from "@components/common/CustomRefreshControl";
import Carousel from "../components/Carousel";
import LatestReports from "../components/LatestReports";
import { HomeRepository } from "../repository";

interface HomeViewProps {
  openDetail: (item: ReportItem) => void;
  jumpTo: (key: string) => void;
}

const HomeView = ({ openDetail, jumpTo }: HomeViewProps) => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      const data = await HomeRepository.getReports();
      setReports(data);
      setError(null);
    } catch {
      setError("Gagal memuat data laporan");
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchReports().finally(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
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

