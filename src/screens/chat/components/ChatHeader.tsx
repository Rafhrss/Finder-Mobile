import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

interface ChatHeaderProps {
  displayName: string;
  initials: string;
  topInset: number;
  profilePicture?: string | null;
  reportId?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  displayName,
  initials,
  topInset,
  profilePicture,
  reportId,
}) => {
  const router = useRouter();

  return (
    <View
      className="bg-[#121C26] px-4 pb-4 rounded-b-3xl flex-row items-center justify-between shadow-lg z-10"
      style={{ paddingTop: Math.max(topInset, 0) + 16 }}
    >
      <View className="flex-row items-center flex-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#0D151D] p-3 rounded-full items-center justify-center mr-4"
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1 pr-2">
          <View className="relative mr-3">
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                className="w-12 h-12 rounded-full border-2 border-blue-500/30"
              />
            ) : (
              <View className="w-12 h-12 bg-[#2D4258] rounded-full items-center justify-center border-2 border-blue-500/30">
                <Text className="text-sm font-bold text-white">{initials}</Text>
              </View>
            )}
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg leading-tight" numberOfLines={1}>
              {displayName}
            </Text>
          </View>
        </View>
      </View>

      {reportId && (
        <TouchableOpacity
          onPress={() => {
            router.push(`/report/${reportId}`);
          }}
          className="bg-blue-500/20 px-3 py-1.5 rounded-full flex-row items-center ml-2 shrink-0"
        >
          <MaterialCommunityIcons name="clipboard-text-outline" size={16} color="#3b82f6" />
          <Text className="text-blue-500 font-semibold text-xs ml-1">Laporan</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

