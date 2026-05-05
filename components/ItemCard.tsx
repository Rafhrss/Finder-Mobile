import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export type Item = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image_url: string;
  status: 'lost' | 'found';
  created_at: string;
};

interface ItemCardProps {
  item: Item;
  onPress: () => void;
}

export default function ItemCard({ item, onPress }: ItemCardProps) {
  const isLost = item.status === 'lost';

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={styles.statusBadge(isLost)}>
          <Ionicons 
            name={isLost ? "alert-circle-outline" : "checkmark-circle-outline"} 
            size={14} 
            color={isLost ? '#FF3B30' : '#34C759'} 
          />
          <Text style={styles.statusText(isLost)}>{isLost ? 'Hilang' : 'Ditemukan'}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={16} color="#8E8E93" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={16} color="#8E8E93" />
          <Text style={styles.infoText}>{item.created_at}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: (isLost: boolean) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isLost ? '#FFEBEE' : '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  }),
  statusText: (isLost: boolean) => ({
    color: isLost ? '#FF3B30' : '#34C759',
    fontSize: 12,
    fontWeight: '600',
  }),
  description: {
    fontSize: 14,
    color: '#3A3A3C',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#8E8E93',
  },
});
