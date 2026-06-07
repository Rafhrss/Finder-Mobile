import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/dummyData";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ReportCard from "@components/common/ReportCard";

interface LatestReportsProps {
  items: ReportItem[];
  openDetail: (item: ReportItem) => void;
}

const LatestReports = ({ items, openDetail }: LatestReportsProps) => {
  return (
    <View className="mt-8 px-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Laporan Terbaru</Text>
        <TouchableOpacity
          className="rounded-full border px-4 py-2"
          style={{ borderColor: theme.colors.primary }}
        >
          <Text
            className="text-sm font-semibold"
            style={{ color: theme.colors.primary }}
          >
            Selengkapnya
          </Text>
        </TouchableOpacity>
      </View>

      {items.map((item) => (
        <ReportCard
          key={item.id}
          item={item}
          onPress={() => openDetail(item)}
        />
      ))}
    </View>
  );
};

export default LatestReports;
