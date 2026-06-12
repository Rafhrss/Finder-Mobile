import React from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ChatMessage } from "../repository";
import { theme } from "@libs/theme";

interface ChatMessageBubbleProps {
  item: ChatMessage;
  currentUserId?: string | null;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  item,
  currentUserId,
}) => {
  const isMe = item.sender.id === currentUserId;

  // Formatting time HH:mm
  const date = new Date(item.created_at);
  const timeString = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  if (isMe) {
    return (
      <View className="flex-col items-end w-full mb-6">
        <View
          className="p-4 rounded-2xl rounded-tr-none max-w-[85%]"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Text className="text-gray-900 font-medium text-sm leading-relaxed">
            {item.message}
          </Text>
        </View>
        <View className="flex-row items-center mt-1 mr-1 space-x-1">
          <Text className="text-[10px] text-gray-500 mr-1">{timeString}</Text>
          <MaterialCommunityIcons
            name="check-all"
            size={14}
            color={theme.colors.primary}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-col items-start max-w-[85%] mb-6">
      <View className="bg-[#1C2732] p-4 rounded-2xl rounded-tl-none">
        <Text className="text-gray-100 text-sm leading-relaxed">
          {item.message}
        </Text>
      </View>
      <Text className="text-[10px] text-gray-500 mt-1 ml-1">{timeString}</Text>
    </View>
  );
};
