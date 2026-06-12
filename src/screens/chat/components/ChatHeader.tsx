import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

interface ChatHeaderProps {
  displayName: string;
  initials: string;
  topInset: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  displayName,
  initials,
  topInset,
}) => {
  const router = useRouter();

  return (
    <View
      className="bg-[#121C26] px-4 pb-4 rounded-b-[2.5rem] flex-row items-center shadow-lg z-10"
      style={{ paddingTop: Math.max(topInset, 0) + 16 }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-[#0D151D] p-3 rounded-full items-center justify-center mr-4"
      >
        <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <View className="flex-row items-center">
        <View className="relative mr-3">
          <View className="w-12 h-12 bg-[#2D4258] rounded-full items-center justify-center border-2 border-blue-500/30">
            <Text className="text-sm font-bold text-white">{initials}</Text>
          </View>
        </View>
        <View>
          <Text className="text-white font-bold text-lg leading-tight">
            {displayName}
          </Text>
        </View>
      </View>
    </View>
  );
};
