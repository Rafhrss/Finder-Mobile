import { useAuth } from "@/src/contexts/AuthContext";
import { theme } from "@/src/libs/theme";
import LoadingOverlay from "@components/common/LoadingOverlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import React from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useUserProfile } from "../hooks/useUserProfile";

const UserProfile = () => {
  const router = useRouter();
  const { userToken, logout } = useAuth();
  const { user, isLoading } = useUserProfile(userToken);

  // Use dynamic stats from user object, fallback to 0 if not available
  const stats = {
    lost: user?.statistics?.lost || 0,
    found: user?.statistics?.found || 0,
    claimed: user?.statistics?.claimed || 0,
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          await logout();
          try {
            await GoogleSignin.signOut();
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  if (isLoading && !user) {
    return <LoadingOverlay />;
  }

  return (
    <View className="flex-1 bg-[#060E17]">
      <ScrollView
        className="flex-1 px-4 pt-4 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View
          className="items-center py-8 px-4 rounded-3xl mb-6"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          {user?.profile_picture ? (
            <Image
              source={{ uri: user.profile_picture }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginBottom: 16,
              }}
              contentFit="cover"
            />
          ) : (
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={40}
                color="#060E17"
              />
            </View>
          )}
          <Text className="text-xl font-bold text-white mb-1">
            {user?.name || "Pengguna"}
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.colors.primary }}
          >
            {user?.email || "-"}
          </Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 mb-8">
          {/* Lost Stat */}
          <View
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{ backgroundColor: theme.colors.surfaceVariant }}
          >
            <Text
              className="text-xl font-bold mb-1"
              style={{ color: "#EF4444" }}
            >
              {stats.lost}
            </Text>
            <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
              Hilang
            </Text>
          </View>

          {/* Found Stat */}
          <View
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{ backgroundColor: theme.colors.surfaceVariant }}
          >
            <Text
              className="text-xl font-bold mb-1"
              style={{ color: "#F59E0B" }}
            >
              {stats.found}
            </Text>
            <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
              Menemukan
            </Text>
          </View>

          {/* Claimed Stat */}
          <View
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{ backgroundColor: theme.colors.surfaceVariant }}
          >
            <Text
              className="text-xl font-bold mb-1"
              style={{ color: theme.colors.primary }}
            >
              {stats.claimed}
            </Text>
            <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
              Selesai
            </Text>
          </View>
        </View>

        {/* Settings List */}
        <Text className="text-xs font-bold text-white uppercase tracking-wider mb-4">
          Pengaturan & Informasi
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/my-reports')}
          className="flex-row items-center justify-between p-4 rounded-2xl mb-3"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-[#060E17] items-center justify-center mr-4">
              <MaterialCommunityIcons
                name="file-document-outline"
                size={20}
                color={theme.colors.primary}
              />
            </View>
            <Text className="text-base font-medium text-white">
              Daftar Laporanku
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.outline}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/about')}
          className="flex-row items-center justify-between p-4 rounded-2xl mb-3"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-[#060E17] items-center justify-center mr-4">
              <MaterialCommunityIcons
                name="information-outline"
                size={20}
                color={theme.colors.primary}
              />
            </View>
            <Text className="text-base font-medium text-white">
              Tentang Aplikasi
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.outline}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          className="flex-row items-center justify-between p-4 rounded-2xl mb-8"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-[#060E17] items-center justify-center mr-4">
              <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
            </View>
            <Text
              className="text-base font-medium"
              style={{ color: "#EF4444" }}
            >
              Keluar Aplikasi
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#EF4444"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
