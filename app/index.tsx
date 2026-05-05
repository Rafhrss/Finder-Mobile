import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ItemCard, { Item } from '../components/ItemCard';

const DUMMY_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Dompet Kulit Coklat',
    description: 'Dompet kulit warna coklat tua, berisi KTM dan kartu ATM',
    category: 'Aksesoris',
    location: 'Gedung Kuliah A Lt. 2',
    image_url: '',
    status: 'lost',
    created_at: '18 Apr',
  },
  {
    id: '2',
    title: 'Kunci Motor Honda',
    description: 'Gantungan kunci motor Honda Beat warna merah dengan gantungan boneka',
    category: 'Aksesoris',
    location: 'Parkiran Fakultas Teknik',
    image_url: '',
    status: 'found',
    created_at: '19 Apr',
  },
  {
    id: '3',
    title: 'Laptop Asus ROG',
    description: 'Laptop gaming Asus ROG warna hitam, ada stiker di bagian belakang',
    category: 'Elektronik',
    location: 'Lab Komputer B',
    image_url: '',
    status: 'lost',
    created_at: '17 Apr',
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Semua');

  const filteredItems = DUMMY_ITEMS.filter(item => {
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Hilang') return item.status === 'lost';
    if (activeTab === 'Ditemukan') return item.status === 'found';
    return true;
  });

  const counts = {
    Semua: DUMMY_ITEMS.length,
    Hilang: DUMMY_ITEMS.filter(i => i.status === 'lost').length,
    Ditemukan: DUMMY_ITEMS.filter(i => i.status === 'found').length,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Blue Header */}
      <View style={styles.blueHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Barang Hilang Kampus</Text>
            <Text style={styles.headerSubtitle}>Papan pengumuman mahasiswa</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Floating Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={22} color="#999" />
          <TextInput 
            placeholder="Cari barang..." 
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {(['Semua', 'Hilang', 'Ditemukan'] as const).map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab} ({counts[tab]})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items Feed */}
      <ScrollView 
        style={styles.feed} 
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onPress={() => console.log('Detail', item.id)} 
          />
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueHeader: {
    backgroundColor: '#1155E0', // Biru Cerah sesuai gambar
    height: 160,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContent: {
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginTop: -30, // Melayang di atas header
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    marginTop: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#1155E0',
  },
  tabText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1155E0',
    fontWeight: 'bold',
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    padding: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1155E0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
