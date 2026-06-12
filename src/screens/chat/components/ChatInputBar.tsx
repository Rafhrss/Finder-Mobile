import React from "react";
import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";

interface ChatInputBarProps {
  inputText: string;
  setInputText: (text: string) => void;
  isReadOnly: boolean;
  isSending: boolean;
  handleSend: () => void;
  bottomInset: number;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  inputText,
  setInputText,
  isReadOnly,
  isSending,
  handleSend,
  bottomInset,
}) => {
  return (
    <View
      className="bg-[#121C26] px-4 pt-4 rounded-t-[2.5rem] shadow-lg flex-row items-center"
      style={{ paddingBottom: Math.max(bottomInset, 16) + 8 }}
    >
      <View className="flex-1 relative justify-center mr-3">
        <TextInput
          className="w-full bg-[#1C2732] border-none text-gray-300 text-sm py-3 px-5 rounded-full"
          placeholder={isReadOnly ? "Chat Readonly" : "Ketik pesan..."}
          placeholderTextColor="#4B5563"
          value={inputText}
          onChangeText={setInputText}
          editable={!isReadOnly}
          onSubmitEditing={handleSend}
        />
      </View>

      <TouchableOpacity
        onPress={handleSend}
        disabled={!inputText.trim() || isSending || isReadOnly}
        className="p-3 rounded-full items-center justify-center"
        style={{
          backgroundColor:
            inputText.trim() && !isReadOnly ? theme.colors.primary : "#2D4258",
          opacity: isSending ? 0.7 : 1,
        }}
      >
        {isSending ? (
          <ActivityIndicator size="small" color="#050A10" />
        ) : (
          <MaterialCommunityIcons
            name="send"
            size={20}
            color="#050A10"
            style={{
              transform: [
                { rotate: "-45deg" },
                { translateX: 2 },
                { translateY: -2 },
              ],
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
