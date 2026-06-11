import { theme } from "@/src/libs/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const AboutView = () => {
  const router = useRouter();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      <ScrollView
        className="flex-1 px-5 pt-12 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center mb-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: theme.colors.surfaceVariant }}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Tentang Aplikasi</Text>
        </View>

        {/* Logo Section */}
        <View className="items-center mb-10">
          <Image
            source={require("@/assets/images/icon_3.png")}
            style={{ width: 150, height: 150, borderRadius: 15 }}
            contentFit="cover"
          />
          <Text className="text-3xl font-extrabold text-white mb-3 tracking-widest">
            UMKT <Text style={{ color: theme.colors.primary }}>FINDER</Text>
          </Text>
          <View className="px-4 py-1.5 rounded-full" style={{ backgroundColor: theme.colors.primaryContainer }}>
            <Text className="text-xs font-bold" style={{ color: theme.colors.primary }}>
              Versi 1.0.0
            </Text>
          </View>
        </View>

        {/* Description Section */}
        <View className="items-center mb-10 px-2">
          <Text className="text-base font-medium leading-relaxed mb-6" style={{ color: theme.colors.onSurfaceVariant, textAlign: "center" }}>
            UMKT Finder adalah aplikasi solusi pelaporan barang hilang dan temuan di lingkungan Universitas Muhammadiyah Kalimantan Timur.
          </Text>
          <Text className="text-base font-medium leading-relaxed" style={{ color: theme.colors.onSurfaceVariant, textAlign: "center" }}>
            Dibuat untuk memudahkan civitas akademika dalam mencari barang yang hilang dengan sistem yang terintegrasi dan transparan.
          </Text>
        </View>

        {/* Contact & Info Section */}
        <View
          className="p-6 rounded-3xl mb-8"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <Text className="text-xs font-bold tracking-widest mb-6" style={{ color: theme.colors.primary }}>
            KONTAK & INFORMASI
          </Text>
          
          <View className="flex-row items-center mb-5">
            <View className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: theme.colors.primary }} />
            <Text className="text-sm font-medium text-white">www.umkt.ac.id</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: theme.colors.primary }} />
            <Text className="text-sm font-medium text-white">Instagram: @umkt.finder</Text>
          </View>
        </View>

        {/* Footer Section */}
        <View className="items-center mt-6">
          <Text className="text-xs font-medium" style={{ color: theme.colors.onSurfaceVariant }}>
            © 2026 UMKT Finder Team. All Rights Reserved.
          </Text>
        </View>
        
        {/* Bottom spacer */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
};

export default AboutView;
