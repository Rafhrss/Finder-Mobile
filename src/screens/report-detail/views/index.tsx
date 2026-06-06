import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/dummyData";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ReportDetailViewProps {
  item: ReportItem;
  onBack: () => void;
}

const ReportDetailView = ({ item, onBack }: ReportDetailViewProps) => {
  const isLost = item.status === "lost";
  const statusColor = isLost ? "#EF4444" : theme.colors.primary;
  const statusLabel = isLost ? "Hilang" : "Ditemukan";
  const statusIcon = isLost ? "alert-circle-outline" : "check-circle-outline";

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-semibold text-white">
          Detail Barang
        </Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Image Placeholder */}
        <View
          className="mt-4 h-64 w-full items-center justify-center rounded-3xl"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <MaterialCommunityIcons
            name="image-outline"
            size={64}
            color={theme.colors.outline}
          />

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

        {/* Status and Date */}
        <View className="mt-6 flex-row items-center justify-between">
          <View
            className="flex-row items-center rounded-lg border px-3 py-1"
            style={{ borderColor: statusColor }}
          >
            <MaterialCommunityIcons
              name={statusIcon}
              size={16}
              color={statusColor}
            />
            <Text
              className="ml-1 text-sm font-semibold"
              style={{ color: statusColor }}
            >
              {statusLabel}
            </Text>
          </View>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {item.created_at}
          </Text>
        </View>

        {/* Title */}
        <Text className="mt-4 text-2xl font-bold text-white">
          {item.title}
        </Text>

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
            <Text className="mt-0.5 text-base text-white">
              {item.location}
            </Text>
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
          {/* Add more info here if needed in the future */}
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
    </SafeAreaView>
  );
};

export default ReportDetailView;
