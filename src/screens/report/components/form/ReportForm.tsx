import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import * as ImagePicker from "expo-image-picker";
import { PREDEFINED_LOCATIONS } from "../../constants";
import ButtonLoader from "@/src/components/common/ButtonLoader";

export interface ReportFormData {
  status: "LOST" | "FOUND" | "CLAIMED";
  title: string;
  location: string;
  customLocation: string;
  description: string;
  image: string | null;
}

interface ReportFormProps {
  initialValues?: Partial<ReportFormData>;
  onSubmit: (data: ReportFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}) => {
  const [status, setStatus] = useState<"LOST" | "FOUND" | "CLAIMED">(
    initialValues?.status || "LOST"
  );
  const [title, setTitle] = useState(initialValues?.title || "");
  const [location, setLocation] = useState(initialValues?.location || "");
  const [customLocation, setCustomLocation] = useState(
    initialValues?.customLocation || ""
  );
  const [description, setDescription] = useState(initialValues?.description || "Warna :\nJumlah :\nMerk :\nUkuran :");
  const [image, setImage] = useState<string | null>(initialValues?.image || null);

  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    onSubmit({ status, title, location, customLocation, description, image });
  };

  return (
    <View className="flex-1 bg-[#050A10]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6 pt-4 pb-24"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Tabs Toggle */}
          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity
              onPress={() => setStatus("LOST")}
              className={`flex-1 py-3 rounded-xl border ${
                status === "LOST" ? "border-[#FF5A5F]" : "border-transparent"
              }`}
              style={{ backgroundColor: "#13212E" }}
            >
              <Text
                className={`text-center font-medium ${
                  status === "LOST" ? "text-[#FF5A5F]" : "text-[#8E9BA7]"
                }`}
              >
                Hilang
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setStatus("FOUND")}
              className={`flex-1 py-3 rounded-xl border ${
                status === "FOUND" ? "border-[#FF9800]" : "border-transparent"
              }`}
              style={{ backgroundColor: "#13212E" }}
            >
              <Text
                className={`text-center font-medium ${
                  status === "FOUND" ? "text-[#FF9800]" : "text-[#8E9BA7]"
                }`}
              >
                Ditemukan
              </Text>
            </TouchableOpacity>

            {initialValues?.status && (
              <TouchableOpacity
                onPress={() => setStatus("CLAIMED")}
                className={`flex-1 py-3 rounded-xl border ${
                  status === "CLAIMED" ? "border-[#10B981]" : "border-transparent"
                }`}
                style={{ backgroundColor: "#13212E" }}
              >
                <Text
                  className={`text-center font-medium ${
                    status === "CLAIMED" ? "text-[#10B981]" : "text-[#8E9BA7]"
                  }`}
                >
                  Selesai
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="space-y-6">
            {/* Nama Barang */}
            <View className="mb-6">
              <Text className="text-xs font-bold text-white tracking-widest mb-2">
                NAMA BARANG
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Masukkan nama barang..."
                value={title}
                onChangeText={setTitle}
                maxLength={180}
                outlineStyle={{ borderRadius: 12, borderWidth: 0 }}
                style={{ backgroundColor: "#101C26" }}
                textColor="white"
                placeholderTextColor="#8E9BA7"
                activeOutlineColor={theme.colors.primary}
              />
            </View>

            {/* Lokasi Kampus */}
            <View className="mb-6">
              <Text className="text-xs font-bold text-white tracking-widest mb-2">
                LOKASI KAMPUS
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsLocationModalVisible(true)}
                className="w-full rounded-xl py-4 px-4 flex-row justify-between items-center"
                style={{ backgroundColor: "#101C26" }}
              >
                <Text style={{ color: location ? "white" : "#8E9BA7", fontSize: 16 }}>
                  {location || "Pilih Lokasi Barang..."}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>

              {location === "Lokasi Lainnya" && (
                <View className="mt-4">
                  <TextInput
                    mode="outlined"
                    placeholder="Tulis kustom lokasi..."
                    value={customLocation}
                    onChangeText={setCustomLocation}
                    maxLength={255}
                    outlineStyle={{ borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', borderColor: "#1E2D3D" }}
                    style={{ backgroundColor: "transparent" }}
                    textColor="white"
                    placeholderTextColor="#8E9BA7"
                    activeOutlineColor={theme.colors.primary}
                  />
                </View>
              )}
            </View>

            {/* Deskripsi */}
            <View className="mb-6">
              <Text className="text-xs font-bold text-white tracking-widest mb-2">
                DESKRIPSI / CIRI CIRI
              </Text>
              <TextInput
                mode="outlined"
                value={description}
                onChangeText={setDescription}
                maxLength={1000}
                multiline
                numberOfLines={6}
                outlineStyle={{ borderRadius: 12, borderWidth: 0 }}
                style={{ backgroundColor: "#101C26", minHeight: 140 }}
                textColor="white"
                placeholderTextColor="#8E9BA7"
                activeOutlineColor={theme.colors.primary}
              />
            </View>

            {/* Upload Section */}
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.7}
              className="rounded-2xl h-48 flex-col items-center justify-center border-2 border-dashed mb-6 overflow-hidden relative"
              style={{
                backgroundColor: "rgba(16, 28, 38, 0.3)",
                borderColor: "#1E2D3D",
              }}
            >
              {image ? (
                <>
                  <Image
                    source={{ uri: image }}
                    className="absolute w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 right-2 bg-black/50 p-2 rounded-lg flex-row items-center">
                    <MaterialCommunityIcons
                      name="pencil"
                      size={16}
                      color="#FFF"
                    />
                    <Text className="text-white font-bold text-xs ml-1">
                      Ubah
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text className="text-white font-bold text-sm">
                    + Unggah Foto
                  </Text>
                  <Text className="text-[10px] mt-1" style={{ color: "#8E9BA7" }}>
                    Format JPG, PNG (Maks. 5MB)
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl items-center justify-center mt-2 mb-10"
              style={{
                backgroundColor: theme.colors.primary,
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? (
                <ButtonLoader />
              ) : (
                <Text className="font-bold text-lg" style={{ color: "#050A10" }}>
                  {submitLabel}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Location Modal */}
      <Modal
        visible={isLocationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsLocationModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsLocationModalVisible(false)}
          className="flex-1 justify-end bg-black/60"
        >
          <View className="bg-[#101C26] rounded-t-3xl pb-8 max-h-[80%]">
            {/* Modal Drag Indicator */}
            <View className="w-full items-center py-3">
              <View className="w-12 h-1.5 bg-[#1E2D3D] rounded-full" />
            </View>

            <View className="px-6 pb-4">
              <Text className="text-lg font-bold text-white text-center">
                Pilih Lokasi Barang
              </Text>
            </View>

            <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
              {PREDEFINED_LOCATIONS.map((loc) => {
                const isSelected = location === loc;
                return (
                  <TouchableOpacity
                    key={loc}
                    onPress={() => {
                      setLocation(loc);
                      setIsLocationModalVisible(false);
                    }}
                    className="flex-row items-center justify-between py-4 border-b border-[#1E2D3D]"
                  >
                    <Text
                      className={`text-base font-medium ${
                        isSelected ? "text-[#0AF3B9]" : "text-[#8E9BA7]"
                      }`}
                    >
                      {loc}
                    </Text>
                    {isSelected && (
                      <MaterialCommunityIcons
                        name="check"
                        size={20}
                        color="#0AF3B9"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
