import ReportCard from "@components/common/ReportCard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface LatestReportsProps {
  items: ReportItem[];
  openDetail: (item: ReportItem) => void;
  jumpTo: (key: string) => void;
}

const LatestReports = ({ items, openDetail, jumpTo }: LatestReportsProps) => {
  return (
    <View className="mt-8 px-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Laporan Terbaru</Text>
        <TouchableOpacity
          onPress={() => jumpTo("search")}
          className="flex-row items-center rounded-full px-3 py-1.5"
          style={{ backgroundColor: `${theme.colors.primary}20` }}
        >
          <Text
            className="mr-1 text-md font-semibold"
            style={{ color: theme.colors.primary }}
          >
            Selengkapnya
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={17}
            color={theme.colors.primary}
          />
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
