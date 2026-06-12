import { useAuth } from "@/src/contexts/AuthContext";
import { useAuthProfile } from "@/src/hooks/useAuthProfile";
import { api } from "@/src/libs/api";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatHeader } from "../components/ChatHeader";
import { ChatInputBar } from "../components/ChatInputBar";
import { ChatMessageBubble } from "../components/ChatMessageBubble";
import { useChatRoom } from "../hooks/useChatRoom";
import { ChatRepository, ChatRoom, ChatUser } from "../repository";

const ChatListView = () => {
  const router = useRouter();
  const { userToken } = useAuth();
  const { user: currentUser } = useAuthProfile();

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRooms = useCallback(
    async (showLoadingIndicator = true) => {
      if (!userToken) {
        setIsLoading(false);
        return;
      }

      try {
        if (showLoadingIndicator) setIsLoading(true);
        // Ensure the authorization token is set
        api.defaults.headers.common["Authorization"] = `Token ${userToken}`;
        const data = await ChatRepository.getRooms();
        setRooms(data || []);
      } catch (error: any) {
        console.error("Gagal mengambil daftar chat room:", error);
        Alert.alert(
          "Gagal Memuat Chat",
          error?.response?.status === 404
            ? "API Endpoint GET /chats/rooms/ belum tersedia di backend (404 Not Found)."
            : "Terjadi kesalahan saat mengambil data chat dari server.",
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [userToken],
  );

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchRooms(false);
  };

  const getOtherUser = (room: ChatRoom) => {
    if (!currentUser) return room.user1; // Fallback
    return room.user1.id === currentUser.id ? room.user2 : room.user1;
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const now = new Date();

      // Check if today
      if (date.toDateString() === now.toDateString()) {
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
      }

      // Check if yesterday
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return "Kemarin";
      }

      // Otherwise return day & month
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agt",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    } catch {
      return "";
    }
  };

  // Filter rooms based on query
  const filteredRooms = rooms.filter((room) => {
    const otherUser = getOtherUser(room);
    const nameMatch = otherUser?.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const lastMsgMatch = room.last_message?.message
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch || lastMsgMatch;
  });

  const renderRoomItem = ({ item }: { item: ChatRoom }) => {
    const otherUser = getOtherUser(item);
    const lastMsg = item.last_message;
    const timeDisplay = formatTime(lastMsg?.created_at || item.created_at);
    const initials = otherUser?.name
      ? otherUser.name.substring(0, 2).toUpperCase()
      : "U";

    // Check if chat is older than 2 days (read-only)
    const createdDate = new Date(item.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const isReadOnly = diffDays > 2;

    return (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/chat/[id]",
            params: {
              id: item.id,
              createdAt: item.created_at,
              otherUserName: otherUser?.name,
              otherUserAvatar: otherUser?.profile_picture,
              reportId: typeof item.report === 'object' ? (item.report as any).id : item.report,
            },
          });
        }}
        activeOpacity={0.7}
        className="flex-row items-center p-4 mb-3 rounded-2xl"
        style={{ backgroundColor: theme.colors.surfaceVariant }}
      >
        {/* Avatar */}
        <View className="relative mr-4">
          {otherUser?.profile_picture ? (
            <Image
              source={{ uri: otherUser.profile_picture }}
              className="w-12 h-12 rounded-full border border-blue-500/20"
            />
          ) : (
            <View className="w-12 h-12 bg-[#2D4258] rounded-full items-center justify-center border border-blue-500/20">
              <Text className="text-sm font-bold text-white">{initials}</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View className="flex-1 justify-center">
          <View className="flex-row justify-between items-center mb-1">
            <Text
              className="text-white font-bold text-base max-w-[70%]"
              numberOfLines={1}
            >
              {otherUser?.name || "Pengguna"}
            </Text>
            <Text className="text-xs text-gray-500">{timeDisplay}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="text-gray-400 text-sm max-w-[85%]"
              numberOfLines={1}
            >
              {lastMsg?.message || "Belum ada pesan."}
            </Text>
            {isReadOnly && (
              <View className="bg-[#1C2732] px-2 py-0.5 rounded">
                <Text className="text-[10px] text-gray-400 font-semibold">
                  RO
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0C141C" />

      <View className="flex-1">
        {/* Search Bar */}
        <View className="px-4 py-4">
          <Searchbar
            placeholder="Cari nama atau obrolan..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ backgroundColor: theme.colors.surfaceVariant }}
            inputStyle={{ color: "white" }}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            iconColor={theme.colors.onSurfaceVariant}
          />
        </View>

        {/* Chat List */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredRooms}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
              />
            }
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center mt-10">
                <MaterialCommunityIcons
                  name="chat-outline"
                  size={48}
                  color={theme.colors.onSurfaceVariant}
                  style={{ opacity: 0.5, marginBottom: 16 }}
                />
                <Text
                  className="text-center font-medium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {searchQuery
                    ? "Tidak ada obrolan yang cocok."
                    : "Belum ada obrolan."}
                </Text>
              </View>
            }
            renderItem={renderRoomItem}
          />
        )}
      </View>
    </View>
  );
};

export default ChatListView;

export interface ChatRoomViewProps {
  roomId: string;
  createdAt?: string;
  otherUserName?: string;
  otherUserAvatar?: string | null;
  reportId?: string;
}

export const ChatRoomView: React.FC<ChatRoomViewProps> = ({
  roomId,
  createdAt,
  otherUserName,
  otherUserAvatar,
  reportId,
}) => {
  const router = useRouter();

  const { currentUserId, messages, isLoading, error, sendMessage } =
    useChatRoom(roomId);

  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [otherUser] = useState<ChatUser | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // Handle specific 404 error
  useEffect(() => {
    if (error?.response?.status === 404) {
      Alert.alert("Error", `Chat tidak ditemukan (Room ID: ${roomId}).`);
      router.back();
    } else if (error) {
      Alert.alert("Error", "Gagal mengambil data chat.");
    }
  }, [error, roomId, router]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    try {
      setIsSending(true);
      await sendMessage(inputText.trim());
      setInputText("");
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error: any) {
      if (
        error.response?.data?.detail === "Chat sudah readonly setelah 2 hari."
      ) {
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
      <ChatHeader
        displayName={displayName}
        initials={initials}
        topInset={insets.top}
        profilePicture={otherUserAvatar}
        reportId={reportId}
      />

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
            renderItem={({ item }) => (
              <ChatMessageBubble item={item} currentUserId={currentUserId} />
            )}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 24,
              paddingBottom: 16,
            }}
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
        <ChatInputBar
          inputText={inputText}
          setInputText={setInputText}
          isReadOnly={isReadOnly}
          isSending={isSending}
          handleSend={handleSend}
          bottomInset={insets.bottom}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
