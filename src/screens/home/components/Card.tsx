import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type Item = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image_url: string;
  status: "lost" | "found";
  created_at: string;
};

interface CardProps {
  item: Item;
  onPress?: () => void;
}

export default function Card({ item, onPress }: CardProps) {
  const isLost = item.status === "lost";

  return (
    <TouchableOpacity
      className="mb-4 rounded-2xl border border-[#E5E5EA] bg-white p-4 shadow-sm"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="mb-2 flex-row items-center justify-between">
        <Text
          className="mr-2 flex-1 text-lg font-bold text-[#1C1C1E]"
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <View
          className={`flex-row items-center gap-1 rounded-[10px] px-2 py-1 ${
            isLost ? "bg-[#FFEBEE]" : "bg-[#E8F5E9]"
          }`}
        >
          <Ionicons
            name={isLost ? "alert-circle-outline" : "checkmark-circle-outline"}
            size={14}
            color={isLost ? "#FF3B30" : "#34C759"}
          />
          <Text
            className={`text-xs font-semibold ${isLost ? "text-[#FF3B30]" : "text-[#34C759]"}`}
          >
            {isLost ? "Hilang" : "Ditemukan"}
          </Text>
        </View>
      </View>

      <Text className="mb-4 text-sm leading-5 text-[#3A3A3C]" numberOfLines={2}>
        {item.description}
      </Text>

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <Ionicons name="location-outline" size={16} color="#8E8E93" />
          <Text className="text-[13px] text-[#8E8E93]">{item.location}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="calendar-outline" size={16} color="#8E8E93" />
          <Text className="text-[13px] text-[#8E8E93]">{item.created_at}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
