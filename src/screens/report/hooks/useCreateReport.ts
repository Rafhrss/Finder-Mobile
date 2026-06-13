import { useState } from "react";
import { Alert, Platform, DeviceEventEmitter } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { ReportRepository } from "../repository";
import type { ReportFormData } from "../components/form/ReportForm";

export const useCreateReport = () => {
  const router = useRouter();
  const { userToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createReport = async (data: ReportFormData) => {
    const { title, description, location, customLocation, status, image } = data;

    if (!title.trim() || !description.trim() || !location) {
      Alert.alert(
        "Error",
        "Harap isi semua field yang wajib (Nama Barang, Lokasi, dan Deskripsi)."
      );
      return;
    }

    if (location === "Lokasi Lainnya" && !customLocation.trim()) {
      Alert.alert("Error", "Harap isi lokasi spesifik.");
      return;
    }

    if (!userToken) {
      Alert.alert("Error", "Anda harus login untuk membuat laporan.");
      return;
    }

    const finalLocation = location === "Lokasi Lainnya" ? customLocation : location;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", finalLocation);
      formData.append("status", status);

      if (image && !image.startsWith("http")) {
        const fileName = image.split("/").pop() || "upload.jpg";
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("image", {
          uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
          name: fileName,
          type,
        } as any);
      }

      await ReportRepository.createReport(formData, userToken);

      Alert.alert("Sukses", "Laporan berhasil dibuat!", [
        {
          text: "OK",
          onPress: () => {
            DeviceEventEmitter.emit("JUMP_TO_TAB", "home");
          },
        },
      ]);
    } catch (error: any) {
      console.error("Gagal membuat laporan:", error.response?.data || error.message);
      Alert.alert(
        "Gagal",
        "Terjadi kesalahan saat membuat laporan. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createReport, isSubmitting };
};
