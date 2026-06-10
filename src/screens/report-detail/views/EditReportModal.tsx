import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReportDetailRepository } from "../repository";
import { useAuth } from "@/src/contexts/AuthContext";

interface EditReportModalProps {
  visible: boolean;
  item: ReportItem;
  onClose: () => void;
  onSuccess: () => void;
}

const LOCATIONS = [
  "Apotek UMKT",
  "Gedung A",
  "Gedung B",
  "Gedung C",
  "Gedung D",
  "Gedung E",
  "Gedung F",
  "Gedung G",
  "Lapangan Kotak",
  "Perpustakaan",
  "Parkiran Gedung A",
  "Parkiran Gedung D",
  "Parkiran Gedung E",
  "Parkiran Gedung F",
  "Parkiran Gedung G",
  "Lokasi Lainnya"
];

const STATUS_OPTIONS = [
  { value: "LOST", label: "Hilang", color: "#EF4444" },
  { value: "FOUND", label: "Menemukan", color: "#F59E0B" },
  { value: "CLAIMED", label: "Selesai", color: theme.colors.primary },
];

export const EditReportModal = ({
  visible,
  item,
  onClose,
  onSuccess,
}: EditReportModalProps) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  
  const [locationPreset, setLocationPreset] = useState<string>(() => {
    return LOCATIONS.includes(item.location) ? item.location : "Lokasi Lainnya";
  });
  const [customLocation, setCustomLocation] = useState<string>(
    LOCATIONS.includes(item.location) ? "" : item.location
  );
  const [showLocationList, setShowLocationList] = useState(false);

  const [status, setStatus] = useState(item.status);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { userToken } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const finalLocation = locationPreset === "Lokasi Lainnya" ? customLocation : locationPreset;

    if (!title.trim() || !description.trim() || !finalLocation.trim()) {
      Alert.alert("Error", "Mohon lengkapi semua kolom teks.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", finalLocation);
      formData.append("status", status);

      if (imageUri) {
        // Create file object from uri
        const filename = imageUri.split("/").pop() || "image.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("image", {
          uri: imageUri,
          name: filename,
          type,
        } as any);
      }

      await ReportDetailRepository.updateReport(item.id, formData, userToken as string);
      onSuccess();
    } catch (error) {
      console.error("Failed to update report:", error);
      Alert.alert(
        "Gagal Menyimpan",
        "Terjadi kesalahan saat menyimpan perubahan. Pastikan koneksi internet stabil.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.colors.background }}
      >
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
            <Text className="text-2xl font-bold" style={{ color: theme.colors.primary }}>Edit Laporan</Text>
            <TouchableOpacity onPress={onClose} className="p-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <KeyboardAwareScrollView 
            className="flex-1 px-4 py-2" 
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps="handled"
          >
            {/* Status Picker (Row) */}
            <View className="mb-6 flex-row gap-3">
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = status === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setStatus(opt.value)}
                    className="flex-1 items-center justify-center rounded-xl py-3 border"
                    style={{
                      borderColor: isSelected ? opt.color : "transparent",
                      backgroundColor: theme.colors.surfaceVariant,
                    }}
                  >
                    <Text
                      className="font-bold text-center"
                      style={{ color: isSelected ? opt.color : theme.colors.onSurfaceVariant }}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Title */}
            <Text className="mb-2 text-xs font-bold text-white uppercase tracking-wider">NAMA BARANG</Text>
            <View
              className="mb-6 rounded-2xl px-4 py-1"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            >
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Masukkan nama barang..."
                placeholderTextColor={theme.colors.outline}
                className="text-base text-white py-3 font-medium"
              />
            </View>

            {/* Location */}
            <Text className="mb-2 text-xs font-bold text-white uppercase tracking-wider">LOKASI KAMPUS</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowLocationList(!showLocationList)}
              className="mb-4 flex-row items-center justify-between rounded-2xl px-4 py-4"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            >
              <Text className="text-base font-medium" style={{ color: locationPreset ? "white" : theme.colors.outline }}>
                {locationPreset || "Pilih Lokasi Barang..."}
              </Text>
              <MaterialCommunityIcons 
                name={showLocationList ? "chevron-up" : "chevron-down"} 
                size={24} 
                color={theme.colors.primary} 
              />
            </TouchableOpacity>

            {/* Dropdown Options List */}
            {showLocationList && (
              <View 
                className="mb-4 rounded-2xl overflow-hidden border border-gray-800"
                style={{ backgroundColor: theme.colors.surfaceVariant, maxHeight: 240 }}
              >
                <ScrollView nestedScrollEnabled={true}>
                  {LOCATIONS.map((loc, index) => {
                    const isSelected = locationPreset === loc;
                    return (
                      <List.Item
                        key={loc}
                        title={loc}
                        titleStyle={{
                          color: isSelected ? theme.colors.primary : theme.colors.onSurfaceVariant,
                          fontSize: 16,
                        }}
                        style={{
                          backgroundColor: isSelected ? `${theme.colors.primary}10` : 'transparent',
                          borderBottomWidth: index !== LOCATIONS.length - 1 ? 1 : 0,
                          borderBottomColor: '#1f2937',
                        }}
                        onPress={() => {
                          setLocationPreset(loc);
                          setShowLocationList(false);
                        }}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* Custom Location Input */}
            {locationPreset === "Lokasi Lainnya" && (
              <View
                className="mb-6 rounded-2xl px-4 py-1 border border-dashed border-gray-700"
                style={{ backgroundColor: "transparent" }}
              >
                <TextInput
                  value={customLocation}
                  onChangeText={setCustomLocation}
                  placeholder="Tulis kustom lokasi jika pilih 'Lainnya'..."
                  placeholderTextColor={theme.colors.outline}
                  className="text-base text-white py-3 font-medium"
                />
              </View>
            )}

            {/* Description */}
            <Text className="mb-2 mt-2 text-xs font-bold text-white uppercase tracking-wider">DESKRIPSI / CIRI CIRI</Text>
            <View
              className="mb-6 rounded-2xl px-4 py-3"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            >
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Warna :\njumlah :\nmerk :\nukuran :"
                placeholderTextColor={theme.colors.outline}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="text-base text-white font-medium"
                style={{ minHeight: 120, paddingTop: 4 }}
              />
            </View>

            {/* Image Picker */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImage}
              className="mb-8 h-40 w-full items-center justify-center rounded-2xl overflow-hidden border border-dashed border-primary"
              style={{ backgroundColor: 'transparent', borderColor: theme.colors.primary }}
            >
              {imageUri || item.image ? (
                <View className="w-full h-full">
                  <Image
                    source={{ uri: imageUri || item.image! }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-black/40 items-center justify-center">
                    <Text className="text-white font-bold text-base">+ Ganti Foto</Text>
                  </View>
                </View>
              ) : (
                <View className="items-center">
                  <Text className="text-base font-bold text-white">+ Unggah Foto</Text>
                  <Text className="mt-1 text-xs" style={{ color: theme.colors.outline }}>Format JPG, PNG (Maks. 5MB)</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={isSubmitting}
              className="mb-12 h-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: theme.colors.primary }}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={theme.colors.onPrimary} />
              ) : (
                <Text className="text-base font-bold" style={{ color: theme.colors.onPrimary }}>
                  Simpan Perubahan
                </Text>
              )}
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
