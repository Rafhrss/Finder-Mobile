import { formatDateString } from "@/src/utils/date";
import { getStatusConfig } from "@/src/utils/status";
import LoadingOverlay from "@components/common/LoadingOverlay";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { api } from "@libs/api";

import CustomRefreshControl from "@components/common/CustomRefreshControl";
import ImageView from "react-native-image-viewing";
import { useAuthProfile } from "@/src/hooks/useAuthProfile";
import { useAuth } from "@/src/contexts/AuthContext";
import { router } from "expo-router";
import { ChatRepository } from "../../chat/repository";
import { EditReportModal } from "./EditReportModal";
import { useReportDetail } from "../hooks/useReportDetail";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ReportDetailViewProps {
  reportId: string;
  initialItem?: ReportItem;
  onBack: () => void;
  withSafeArea?: boolean;
}

const ReportDetailView = ({
  reportId,
  initialItem,
  onBack,
  withSafeArea = false,
}: ReportDetailViewProps) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const insets = useSafeAreaInsets();

  const { user: currentUser } = useAuthProfile();
  const { userToken } = useAuth();
  
  // Use SWR Hook instead of manual state
  const { item, mutate, error } = useReportDetail(reportId, initialItem);
  
  const isCreator = currentUser?.email === item?.user?.email;

  const onRefresh = async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  };

  if (error) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color={theme.colors.error} />
        <Text className="mt-4 text-white text-center">Gagal memuat detail laporan.</Text>
        <Text className="mt-2 text-sm text-gray-400 text-center">{error.message || String(error)}</Text>
        <TouchableOpacity onPress={() => onBack()} className="mt-4 bg-blue-500 px-4 py-2 rounded-full">
          <Text className="text-white font-bold">Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!item) {
    return <LoadingOverlay />;
  }

  const statusConfig = getStatusConfig(item.status);

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <View 
        className="flex-row items-center justify-between px-4 pb-4"
        style={{ paddingTop: withSafeArea ? Math.max(insets.top, 16) + 8 : 16 }}
      >
        <View className="flex-row items-center">
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

        {isCreator && (
          <TouchableOpacity
            onPress={() => setIsEditModalVisible(true)}
            className="h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.colors.primary + '20' }}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}
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


        </View>

        {/* Status and Date */}
        <View className="mt-6 flex-row items-center justify-between">
          <View
            className="flex-row items-center rounded-lg border px-3 py-1"
            style={{ borderColor: statusConfig.color }}
          >
            <MaterialCommunityIcons
              name={statusConfig.icon as any}
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
                className="mr-3 h-12 w-12 items-center justify-center rounded-full overflow-hidden"
                style={{ backgroundColor: theme.colors.surfaceVariant }}
              >
                {item.user?.profile_picture ? (
                  <Image source={{ uri: item.user.profile_picture }} style={{ width: 48, height: 48 }} contentFit="cover" />
                ) : (
                  <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color={theme.colors.primary}
                  />
                )}
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
      {!isCreator && (
        <View
          className="rounded-t-3xl px-4 py-4 pb-8"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <TouchableOpacity
            onPress={async () => {
              try {
                if (userToken) {
                  api.defaults.headers.common["Authorization"] = `Token ${userToken}`;
                }
                const room = await ChatRepository.createOrGetRoom(item.id);
                router.push({
                  pathname: "/chat/[id]",
                  params: {
                    id: room.id,
                    createdAt: room.created_at,
                    otherUserName: room.user1.name, // Since we are not the owner, the other user is the owner (user1)
                  }
                });
              } catch (error: any) {
                console.error("Gagal membuka chat room:", error.response?.data || error);
                Alert.alert("Error", "Gagal membuka chat room. Silakan coba lagi.");
              }
            }}
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
      )}

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
            <View
              style={{ position: "absolute", width: "100%", zIndex: 10, paddingTop: 48 }}
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
            </View>
          )}
        />
      )}

      {/* Edit Modal */}
      {isCreator && (
        <EditReportModal
          visible={isEditModalVisible}
          item={item}
          onClose={() => setIsEditModalVisible(false)}
          onSuccess={() => {
            setIsEditModalVisible(false);
            onRefresh();
          }}
        />
      )}
    </View>
  );
};

export default ReportDetailView;
