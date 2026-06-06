import React from "react";
import { View } from "react-native";
import {
  Chip,
  Icon,
  Card as PaperCard,
  Text,
  useTheme,
} from "react-native-paper";
import type { ReportItem } from "@libs/dummyData";

interface ReportCardProps {
  item: ReportItem;
  onPress?: () => void;
}

const ReportCard = ({ item, onPress }: ReportCardProps) => {
  const { colors } = useTheme();
  const isLost = item.status === "lost";
  const statusLabel = isLost ? "Hilang" : "Ditemukan";

  return (
    <View className="mb-4">
      <PaperCard mode="contained" onPress={onPress}>
        <PaperCard.Content>
          <View className="mb-2 flex-row items-center justify-between gap-2">
            <View className="mr-2 flex-1">
              <Text variant="titleMedium" numberOfLines={1}>
                {item.title}
              </Text>
            </View>
            <Chip
              compact
              mode="outlined"
              icon={isLost ? "alert-circle-outline" : "check-circle-outline"}
              theme={{
                colors: {
                  surface: isLost ? "#EF444429" : `${colors.primary}29`,
                  onSurfaceVariant: isLost ? "#EF4444" : colors.primary,
                  outline: "transparent",
                },
              }}
            >
              {statusLabel}
            </Chip>
          </View>

          <View className="mb-3">
            <Text variant="bodyMedium" numberOfLines={2}>
              {item.description}
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Icon source="map-marker-outline" size={16} />
              <Text variant="labelMedium">{item.location}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon source="calendar-outline" size={16} />
              <Text variant="labelMedium">{item.created_at}</Text>
            </View>
          </View>
        </PaperCard.Content>
      </PaperCard>
    </View>
  );
};

export default ReportCard;
