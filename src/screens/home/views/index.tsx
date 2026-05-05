import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportList, { DUMMY_ITEMS } from "../components/list/ReportList";
import { convertStatus } from "../utils";

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "lost" | "found">("all");

  const counts = {
    all: DUMMY_ITEMS.length,
    lost: DUMMY_ITEMS.filter((i) => i.status === "lost").length,
    found: DUMMY_ITEMS.filter((i) => i.status === "found").length,
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <View className="h-32 justify-center bg-blue-700 px-5 rounded-e-3xl">
        <SafeAreaView>
          <View className="mt-2">
            <View className="flex flex-row items-center justify-center gap-3">
              <Image
                source={require("@assets/images/icon.png")}
                className="w-12 h-12 rounded-md"
              />
              <Text className="text-[28px] font-bold text-white">
                UMKT Finder
              </Text>
            </View>

            <Text className="mt-1 text-base text-center text-white/80">
              Papan pengumuman mahasiswa
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <View className="-mt-3 px-5">
        <View className="h-[60px] flex-row items-center rounded-xl border border-[#E5E5EA] bg-white px-[15px] shadow-lg">
          <Ionicons name="search-outline" size={22} color="#999" />
          <TextInput
            placeholder="Cari barang..."
            className="ml-2.5 flex-1 text-lg text-black"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View className="mt-5 flex-row border-b border-[#E5E5EA]">
        {(["all", "lost", "found"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 items-center py-[15px] ${
              activeTab === tab ? "border-b-[3px] border-b-[#1155E0]" : ""
            }`}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-[15px] ${
                activeTab === tab
                  ? "font-bold text-[#1155E0]"
                  : "font-medium text-[#666]"
              }`}
            >
              {convertStatus(tab)} ({counts[tab]})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ReportList activeTab={activeTab} />

      <TouchableOpacity
        className="absolute bottom-3 right-3 h-14 w-14 items-center justify-center rounded-full bg-[#1155E0] shadow-xl"
        onPress={() => router.push("/report")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
