import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import LoadingOverlay from "@components/common/LoadingOverlay";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const data = await HomeRepository.getReports();
        if (isMounted) {
          setReports(data);
          setError(null);
        }
      } catch {
        if (isMounted) setError("Gagal memuat data laporan");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchReports();
    return () => {
      isMounted = false;
    };
  }, []);

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
    >
      <Carousel items={carouselItems} openDetail={openDetail} />
      <LatestReports items={latestReports} openDetail={openDetail} jumpTo={jumpTo} />

      {/* Bottom Spacer */}
      <View className="h-4" />
    </ScrollView>
  );
};

export default HomeView;

