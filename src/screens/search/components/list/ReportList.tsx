import React, { useState } from "react";
import { FlatList } from "react-native";
import CustomRefreshControl from "@components/common/CustomRefreshControl";
import ReportCard from "@components/common/ReportCard";
import type { ReportItem } from "@libs/types";

type ReportListProps = {
  activeTab: "all" | "lost" | "found" | "done";
  searchQuery: string;
  openDetail: (item: ReportItem) => void;
};

const ReportList = ({ activeTab, searchQuery, openDetail }: ReportListProps) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Connect to actual API fetch when integrated
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Temporary empty array until API integration is complete in FU-19
  const reports: ReportItem[] = [];
  const filteredItems = reports.filter((item) => {
    const matchedTab =
      activeTab === "all"
        ? true
        : activeTab === "lost"
          ? item.status === "lost"
          : item.status === "found";
    if (!matchedTab) return false;
    if (!normalizedQuery) return true;

    return [item.title, item.description, item.location, item.category]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return (
    <FlatList
      data={filteredItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReportCard
          item={item}
          onPress={() => openDetail(item)}
        />
      )}
      className="px-4 pt-3 pb-4"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <CustomRefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default ReportList;
