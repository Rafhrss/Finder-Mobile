import React, { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ReportDetailView from '@/src/screens/report/views/ReportDetailView';
import type { ReportItem } from '@/src/libs/types';
import { View } from 'react-native';
import { theme } from '@/src/libs/theme';

export default function ReportDetailPage() {
  const { id, itemData } = useLocalSearchParams<{ id: string, itemData?: string }>();
  const router = useRouter();

  const item = useMemo(() => {
    if (itemData) {
      try {
        return JSON.parse(itemData) as ReportItem;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }, [itemData]);

  if (!id) {
    return <View className="flex-1" style={{ backgroundColor: theme.colors.background }} />;
  }

  return (
    <ReportDetailView 
      reportId={id}
      initialItem={item}
      onBack={() => router.back()}
      withSafeArea
    />
  );
}
