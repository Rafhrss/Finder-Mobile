import { formatDateString } from "@/src/utils/date";
import { getStatusConfig } from "@/src/utils/status";
import LoadingOverlay from "@components/common/LoadingOverlay";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import { Image } from "expo-image";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomRefreshControl from "@components/common/CustomRefreshControl";
import ImageView from "react-native-image-viewing";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReportDetailRepository } from "../repository";

interface ReportDetailViewProps {
  item: ReportItem;
  onBack: () => void;
}

const ReportDetailView = ({
  item: initialItem,
  onBack,
}: ReportDetailViewProps) => {
  const [item, setItem] = useState<ReportItem>(initialItem);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const fetchDetail = useCallback(async () => {
    try {
      const data = await ReportDetailRepository.getReportDetail(
        initialItem.id,
      );
      setItem(data);
    } catch (error) {
      // Silently fallback to initial item if failed
      console.warn("Failed to fetch fresh report detail", error);
    }
  }, [initialItem.id]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchDetail().finally(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [fetchDetail]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDetail();
    setRefreshing(false);
  };

  if (isLoading || !item) {
    return <LoadingOverlay />;
  }

  const statusConfig = getStatusConfig(item.status);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <View className="flex-row items-center px-4 pb-3">
        <TouchableOpacity
          onPress={onBack}
          className="h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={20}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <Text className="ml-3 text-base font-semibold text-white">
          Detail Barang
        </Text>
      </View>

      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <CustomRefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/* Image Placeholder or Actual Image */}
        <View
          className="mt-4 h-64 w-full items-center justify-center rounded-3xl overflow-hidden"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          {item.image ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsImageModalVisible(true)}
              className="h-full w-full"
            >
              <Image
                source={item.image}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons
              name="image-outline"
              size={64}
              color={theme.colors.outline}
            />
          )}

          {/* Photo Count Badge */}
          <View
            className="absolute bottom-4 right-4 flex-row items-center rounded-lg px-2 py-1"
            style={{ backgroundColor: theme.colors.background }}
          >
            <MaterialCommunityIcons
              name="image-multiple-outline"
              size={14}
              color={theme.colors.onSurfaceVariant}
            />
            <Text className="ml-1 text-xs text-white">1 Foto</Text>
          </View>
        </View>

        {isLoading && (
          <ActivityIndicator
            size="small"
            color={theme.colors.primary}
            style={{ marginTop: 16 }}
          />
        )}

        {/* Status and Date */}
        <View className="mt-6 flex-row items-center justify-between">
          <View
            className="flex-row items-center rounded-lg border px-3 py-1"
            style={{ borderColor: statusConfig.color }}
          >
            <MaterialCommunityIcons
              name={statusConfig.icon}
              size={16}
              color={statusConfig.color}
            />
            <Text
              className="ml-1 text-sm font-semibold"
              style={{ color: statusConfig.color }}
            >
              {statusConfig.label}
            </Text>
          </View>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {formatDateString(item.created_at)}
          </Text>
        </View>

        {/* Title */}
        <Text className="mt-4 text-2xl font-bold text-white">{item.title}</Text>

        {/* Location Card */}
        <View
          className="mt-4 flex-row items-center rounded-2xl px-4 py-4"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <View
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.colors.background }}
          >
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={20}
              color={theme.colors.primary}
            />
          </View>
          <View className="ml-3">
            <Text
              className="text-xs font-bold"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              TERAKHIR DILIHAT / LOKASI
            </Text>
            <Text className="mt-0.5 text-base text-white">{item.location}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View className="mt-8">
          <Text
            className="text-sm font-bold"
            style={{ color: theme.colors.primary }}
          >
            DESKRIPSI / CIRI-CIRI
          </Text>
          <Text
            className="mt-3 text-base leading-6"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {item.description}
          </Text>
        </View>

        {/* Reporter Info Header */}
        <View className="mt-8 mb-8">
          <Text className="text-sm font-bold text-white">
            INFORMASI PELAPOR
          </Text>
          {item.user ? (
            <View className="mt-4 flex-row items-center">
              <View
                className="mr-3 h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: theme.colors.surfaceVariant }}
              >
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <View>
                <Text className="text-base font-bold text-white">
                  {item.user.name}
                </Text>
                <Text
                  className="text-sm"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.user.email}
                </Text>
              </View>
            </View>
          ) : (
            <Text
              className="mt-2 text-sm italic"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Informasi pelapor tidak tersedia untuk publik
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        className="rounded-t-3xl px-4 py-4 pb-8"
        style={{ backgroundColor: theme.colors.surfaceVariant }}
      >
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-2xl py-4"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <MaterialCommunityIcons
            name="chat-processing"
            size={20}
            color={theme.colors.onPrimary}
          />
          <Text
            className="ml-2 text-base font-bold"
            style={{ color: theme.colors.onPrimary }}
          >
            Chat Pelapor
          </Text>
        </TouchableOpacity>
      </View>

      {/* Image Zoom Modal */}
      {item.image && (
        <ImageView
          images={[{ uri: item.image }]}
          imageIndex={0}
          visible={isImageModalVisible}
          onRequestClose={() => setIsImageModalVisible(false)}
          animationType="fade"
          swipeToCloseEnabled={true}
          HeaderComponent={() => (
            <SafeAreaView
              edges={["top"]}
              style={{ position: "absolute", width: "100%", zIndex: 10 }}
            >
              <View className="flex-row justify-end p-4">
                <TouchableOpacity
                  onPress={() => setIsImageModalVisible(false)}
                  className="rounded-full p-2"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <MaterialCommunityIcons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ReportDetailView;
