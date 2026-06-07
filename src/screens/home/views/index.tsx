import { theme } from "@libs/theme";
import { DUMMY_ITEMS, type ReportItem } from "@libs/dummyData";
import React from "react";
import { ScrollView, View } from "react-native";
import Carousel from "../components/Carousel";
import LatestReports from "../components/LatestReports";

interface HomeViewProps {
  openDetail: (item: ReportItem) => void;
}

const HomeView = ({ openDetail }: HomeViewProps) => {
  // Ambil 3 data terbaru untuk carousel
  const carouselItems = DUMMY_ITEMS.slice(0, 3);
  // Ambil sisa data atau 3 data terbaru untuk daftar (disesuaikan dengan logic asli)
  const latestReports = DUMMY_ITEMS.slice(0, 3);

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <Carousel items={carouselItems} openDetail={openDetail} />
      <LatestReports items={latestReports} openDetail={openDetail} />

      {/* Bottom Spacer */}
      <View className="h-4" />
    </ScrollView>
  );
};

export default HomeView;
