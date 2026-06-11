import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { theme } from "@libs/theme";
import { chatApi, ChatRoom } from "@libs/api-chat";
import { useAuth } from "@/src/contexts/AuthContext";
import { useAuthProfile } from "@/src/hooks/useAuthProfile";
import { api } from "@/src/libs/api";

const ChatListView = () => {
  const router = useRouter();
  const { userToken } = useAuth();
  const { user: currentUser } = useAuthProfile();

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRooms = useCallback(async (showLoadingIndicator = true) => {
    if (!userToken) {
      setIsLoading(false);
      return;
    }

    try {
      if (showLoadingIndicator) setIsLoading(true);
      // Ensure the authorization token is set
      api.defaults.headers.common["Authorization"] = `Token ${userToken}`;
      const data = await chatApi.getRooms();
      setRooms(data || []);
    } catch (error) {
      console.error("Gagal mengambil daftar chat room:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [userToken]);

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
      const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    } catch (e) {
      return "";
    }
  };

  // Filter rooms based on query
  const filteredRooms = rooms.filter((room) => {
    const otherUser = getOtherUser(room);
    const nameMatch = otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const lastMsgMatch = room.last_message?.message?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || lastMsgMatch;
  });

  const renderRoomItem = ({ item }: { item: ChatRoom }) => {
    const otherUser = getOtherUser(item);
    const lastMsg = item.last_message;
    const timeDisplay = formatTime(lastMsg?.created_at || item.created_at);
    const initials = otherUser?.name ? otherUser.name.substring(0, 2).toUpperCase() : "U";

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
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121C26] rounded-full" />
        </View>

        {/* Info */}
        <View className="flex-1 justify-center">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-white font-bold text-base max-w-[70%]" numberOfLines={1}>
              {otherUser?.name || "Pengguna"}
            </Text>
            <Text className="text-xs text-gray-500">
              {timeDisplay}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-400 text-sm max-w-[85%]" numberOfLines={1}>
              {lastMsg?.message || "Belum ada pesan."}
            </Text>
            {isReadOnly && (
              <View className="bg-[#1C2732] px-2 py-0.5 rounded">
                <Text className="text-[10px] text-gray-400 font-semibold">RO</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0C141C" />

      <View className="flex-1 px-6 pt-8">
  

        {/* Search Bar */}
        <View className="relative mb-6 justify-center">
          <View className="absolute left-4 z-10">
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
          <TextInput
            className="w-full pl-11 pr-4 py-3 rounded-xl text-white"
            style={{ backgroundColor: theme.colors.surfaceVariant }}
            placeholder="Cari nama atau obrolan..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
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
            contentContainerStyle={{ paddingBottom: 24 }}
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
                <Text className="text-center font-medium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {searchQuery ? "Tidak ada obrolan yang cocok." : "Belum ada obrolan."}
                </Text>
              </View>
            }
            renderItem={renderRoomItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatListView;
