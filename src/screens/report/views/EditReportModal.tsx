import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import { ReportForm } from "../components/form/ReportForm";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { PREDEFINED_LOCATIONS } from "../constants";

interface EditReportModalProps {
  visible: boolean;
  item: ReportItem;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditReportModal = ({
  visible,
  item,
  onClose,
  onSuccess,
}: EditReportModalProps) => {
  const { updateReport, isSubmitting } = useUpdateReport(item.id, onSuccess);

  const initialValues = {
    title: item.title,
    description: item.description,
    status: item.status as "LOST" | "FOUND" | "CLAIMED",
    location: PREDEFINED_LOCATIONS.includes(item.location) ? item.location : "Lokasi Lainnya",
    customLocation: PREDEFINED_LOCATIONS.includes(item.location) ? "" : item.location,
    image: item.image || null,
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1" style={{ backgroundColor: "#050A10" }}>
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2 bg-[#050A10]">
          <Text className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
            Edit Laporan
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ReportForm
          initialValues={initialValues}
          onSubmit={updateReport}
          isSubmitting={isSubmitting}
          submitLabel="Simpan Perubahan"
        />
      </View>
    </Modal>
  );
};
