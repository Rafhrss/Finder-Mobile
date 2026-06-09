import React, { useState } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import CustomRefreshControl from "@components/common/CustomRefreshControl";
import ReportCard from "@components/common/ReportCard";
import type { ReportItem } from "@libs/types";
import { useSearchReports } from "../../hooks/useSearchReports";

type ReportListProps = {
  activeTab: "all" | "lost" | "found" | "done";
  searchQuery: string;
  openDetail: (item: ReportItem) => void;
};

const ReportList = ({ activeTab, searchQuery, openDetail }: ReportListProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { reports, isLoading, isError, mutate, size, setSize, isLoadingMore, isReachingEnd } = useSearchReports(searchQuery, activeTab);

  const onRefresh = async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  };

  const loadMore = () => {
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  };

  if (isLoading && reports.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <ActivityIndicator size="large" color="#0AF3B9" />
      </View>
    );
  }

  if (isError && reports.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-[#FCA5A5] text-center font-medium">
          Gagal memuat data pencarian. Silakan coba lagi.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reports}
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
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoadingMore && !isReachingEnd ? (
          <View className="py-4">
            <ActivityIndicator size="small" color="#0AF3B9" />
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-8 mt-10">
          <Text className="text-white text-lg font-bold mb-2">Tidak ditemukan</Text>
          <Text className="text-[#9CA3AF] text-center">
            Pencarian untuk &quot;{searchQuery}&quot; tidak membuahkan hasil.
          </Text>
        </View>
      }
    />
  );
};

export default ReportList;
