import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import ReportCard from "@/src/components/common/ReportCard";
import { theme } from "@/src/libs/theme";
import type { ReportItem } from "@/src/libs/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Animated, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useMyReports } from "../hooks/useMyReports";
import { ReportDetailOverlay } from "@/src/components/layout/ReportDetailOverlay";

type FilterTab = "all" | "lost" | "found" | "done";

const MyReportsView = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  
  const { reports, isLoading, mutate } = useMyReports(activeTab);

  const [refreshing, setRefreshing] = useState(false);

  // Detail overlay state
  const [detailItem, setDetailItem] = useState<ReportItem | null>(null);
  const [slideAnim] = useState(new Animated.Value(1));

  const openDetail = (item: ReportItem) => {
    setDetailItem(item);
    slideAnim.setValue(1);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeDetail = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setDetailItem(null);
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: `Semua ${reports && activeTab === 'all' ? `(${reports.length})` : ''}` },
    { key: "lost", label: "Hilang" },
    { key: "found", label: "Ditemukan" },
    { key: "done", label: "Selesai" },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Daftar Laporanku</Text>
      </View>

      {/* Filter Tabs */}
      <View className="px-4 pb-4">
        <FlatList
          horizontal
          data={tabs}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => {
            const isActive = activeTab === item.key;
            return (
              <TouchableOpacity
                onPress={() => setActiveTab(item.key)}
                className="px-5 py-2.5 rounded-xl"
                style={{
                  backgroundColor: isActive ? theme.colors.primary : theme.colors.surfaceVariant,
                }}
              >
                <Text
                  className="font-bold text-sm"
                  style={{
                    color: isActive 
                      ? theme.colors.onPrimary 
                      : item.key === 'lost'
                      ? '#EF4444'
                      : item.key === 'found'
                      ? '#F59E0B'
                      : item.key === 'done'
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* List Content */}
      {isLoading && !refreshing ? (
        <View className="flex-1 justify-center items-center">
          <LoadingOverlay transparent={true} />
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 40 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center pt-20">
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={64}
                color={theme.colors.outline}
                style={{ marginBottom: 16 }}
              />
              <Text className="text-base font-medium" style={{ color: theme.colors.onSurfaceVariant }}>
                Belum ada laporan
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ReportCard 
              item={item} 
              onPress={() => openDetail(item)} 
            />
          )}
        />
      )}
      
      <ReportDetailOverlay
        detailItem={detailItem}
        slideAnim={slideAnim}
        closeDetail={closeDetail}
      />
    </View>
  );
};

export default MyReportsView;
