import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ButtonLoader from "@/src/components/common/ButtonLoader";
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
      className="bg-transparent px-2 pt-2 flex-row items-center"
      style={{ paddingBottom: Math.max(bottomInset, 16) }}
    >
      <View className="flex-1 flex-row items-center bg-[#1F2C34] rounded-full mr-2 h-[48px] px-5">
        <TextInput
          className="flex-1 border-none text-white text-lg"
          placeholder={isReadOnly ? "Chat Readonly" : "Message"}
          placeholderTextColor="#8696A0"
          value={inputText}
          onChangeText={setInputText}
          editable={!isReadOnly}
          multiline={false}
        />
      </View>

      <TouchableOpacity
        onPress={handleSend}
        disabled={!inputText.trim() || isSending || isReadOnly}
        className="h-[48px] w-[48px] rounded-full items-center justify-center"
        style={{
          backgroundColor:
            inputText.trim() && !isReadOnly ? "#00A884" : "#1F2C34",
          opacity: isSending ? 0.7 : 1,
        }}
      >
        {isSending ? (
          <ButtonLoader />
        ) : (
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={inputText.trim() && !isReadOnly ? "white" : "#8696A0"}
            style={{ transform: [{ translateX: 2 }] }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
