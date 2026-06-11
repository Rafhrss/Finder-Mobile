import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { theme } from "@libs/theme";
import { chatApi, ChatMessage, ChatRoom, ChatUser } from "@libs/api-chat";
import { useAuth } from "@/src/contexts/AuthContext";
import { api } from "@/src/libs/api"; // To fetch current user if needed

interface ChatRoomViewProps {
  roomId: string;
  createdAt?: string;
  otherUserName?: string;
}

const ChatRoomView: React.FC<ChatRoomViewProps> = ({ roomId, createdAt, otherUserName }) => {
  const router = useRouter();
  const { userToken } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<ChatUser | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // Fetch current user ID and messages
  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true);

        // Fetch current user ID
        let myId = currentUserId;
        if (userToken && !myId) {
          api.defaults.headers.common["Authorization"] = `Token ${userToken}`;
          try {
            const userResponse = await api.get("/users/me/");
            myId = userResponse.data.id;
            setCurrentUserId(myId);
          } catch (e) {
            console.error("Gagal mendapatkan user info", e);
          }
        }

        // Note: Without a room detail endpoint, we will just use a fallback name
        // The best approach is to pass the other user's name via route params
        // but for now we fallback to "Pengguna"

        // Fetch messages
        console.log("Fetching messages for room ID:", roomId);
        const fetchedMessages = await chatApi.getMessages(roomId);
        setMessages(fetchedMessages);

      } catch (error: any) {
        console.error("Error fetching messages:", error.response?.status, error.response?.data || error.message);
        if (error.response?.status === 404) {
          Alert.alert("Error", `Chat tidak ditemukan (Room ID: ${roomId}).`);
          router.back();
        } else {
          Alert.alert("Error", "Gagal mengambil data chat.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [roomId, userToken]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    try {
      setIsSending(true);
      const newMessage = await chatApi.sendMessage(roomId, inputText.trim());
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error: any) {
      if (error.response?.data?.detail === "Chat sudah readonly setelah 2 hari.") {
        setIsReadOnly(true);
        Alert.alert("Info", "Chat sudah readonly setelah 2 hari.");
      } else {
        Alert.alert("Gagal", "Gagal mengirim pesan.");
      }
      console.log("Send error", error.response?.data || error);
    } finally {
      setIsSending(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
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

  // Check if chat is older than 2 days
  useEffect(() => {
    if (createdAt) {
      const createdDate = new Date(createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      if (diffDays > 2) {
        setIsReadOnly(true);
      }
    }
  }, [createdAt]);

  const targetName = otherUser?.name || otherUserName || "Pengguna";
  const initials = targetName.substring(0, 2).toUpperCase();
  const displayName = targetName;

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#050A10]">
      <StatusBar barStyle="light-content" backgroundColor="#121C26" />

      {/* Header */}
      <View
        className="bg-[#121C26] px-4 pb-4 rounded-b-[2.5rem] flex-row items-center shadow-lg z-10"
        style={{ paddingTop: Math.max(insets.top, 16) + 8 }}
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
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121C26] rounded-full" />
          </View>
          <View>
            <Text className="text-white font-bold text-lg leading-tight">
              {displayName}
            </Text>
            <Text
              className="text-xs font-medium"
              style={{ color: theme.colors.primary }}
            >
              Online
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            ListHeaderComponent={
              messages.length > 0 ? (
                <View className="flex-row justify-center mb-6">
                  <View className="bg-[#1C2732] px-4 py-1.5 rounded-lg">
                    <Text className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      Hari Ini
                    </Text>
                  </View>
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center mt-10">
                <Text className="text-gray-500">Belum ada pesan.</Text>
              </View>
            }
          />
        )}

        {/* Input Bar */}
        <View
          className="bg-[#121C26] px-4 pt-4 rounded-t-[2.5rem] shadow-lg flex-row items-center"
          style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
        >
          <View className="flex-1 relative justify-center mr-3">
            <TextInput
              className="w-full bg-[#050A10] border-none text-gray-300 text-sm py-3 px-5 rounded-full"
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
              backgroundColor: inputText.trim() && !isReadOnly ? theme.colors.primary : '#2D4258',
              opacity: isSending ? 0.7 : 1
            }}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#050A10" />
            ) : (
              <MaterialCommunityIcons name="send" size={20} color="#050A10" style={{ transform: [{ rotate: '-45deg' }, { translateX: 2 }, { translateY: -2 }] }} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoomView;
