import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Modal, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { theme } from '@libs/theme';
import { api } from '@libs/api';
import { useAuth } from '@/src/contexts/AuthContext';

const ReportView = () => {
  const router = useRouter();
  const { userToken } = useAuth();
  
  const [status, setStatus] = useState<'LOST' | 'FOUND'>('LOST');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  const predefinedLocations = ['Pilih Lokasi Barang...', 'Apotek UMKT', 'Gedung A', 'Gedung B', 'Gedung C', 'Gedung D', 'Gedung E', 'Gedung F', 'Gedung G', 'Lapangan Kotak', 'Perpustakaan', 'Parkiran Gedung A', 'Parkiran Gedung D', 'Parkiran Gedung E', 'Parkiran Gedung F', 'Parkiran Gedung G', 'Lokasi Lainnya'];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
        Alert.alert('Error', 'Ukuran file gambar tidak boleh melebihi 5MB.');
        return;
      }
      setImage(asset);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !location) {
      Alert.alert('Error', 'Harap isi semua field yang wajib (Nama Barang, Lokasi, dan Deskripsi).');
      return;
    }

    if (location === 'Lokasi Lainnya' && !customLocation.trim()) {
      Alert.alert('Error', 'Harap isi lokasi spesifik.');
      return;
    }

    const finalLocation = location === 'Lokasi Lainnya' ? customLocation : location;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('location', finalLocation);
      formData.append('status', status);

      if (image) {
        const fileName = image.uri.split('/').pop() || 'upload.jpg';
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        
        formData.append('image', {
          uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
          name: fileName,
          type,
        } as any);
      }

      api.defaults.headers.common['Authorization'] = `Token ${userToken}`;
      await api.post('/reports/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Sukses', 'Laporan berhasil dibuat!', [
        { text: 'OK', onPress: () => {
          DeviceEventEmitter.emit("JUMP_TO_TAB", "home");
          // Optionally router.replace('/') if they are somehow on a different path
          router.replace('/');
        }}
      ]);
      
      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setCustomLocation('');
      setImage(null);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert('Gagal', 'Terjadi kesalahan saat membuat laporan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050A10]" edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 pt-4 pb-24" showsVerticalScrollIndicator={false}>
          <Text className="text-2xl font-bold mb-6" style={{ color: theme.colors.primary }}>
            Tambah Laporan
          </Text>

          {/* Tabs Toggle */}
          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity 
              onPress={() => setStatus('LOST')}
              className={`flex-1 py-3 rounded-xl border ${status === 'LOST' ? 'border-[#FF5A5F]' : 'border-transparent'}`}
              style={{ backgroundColor: '#13212E' }}
            >
              <Text className={`text-center font-medium ${status === 'LOST' ? 'text-[#FF5A5F]' : 'text-[#8E9BA7]'}`}>
                Barang Hilang
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setStatus('FOUND')}
              className={`flex-1 py-3 rounded-xl border ${status === 'FOUND' ? 'border-[#FF9800]' : 'border-transparent'}`}
              style={{ backgroundColor: '#13212E' }}
            >
              <Text className={`text-center font-medium ${status === 'FOUND' ? 'text-[#FF9800]' : 'text-[#8E9BA7]'}`}>
                Barang Ditemukan
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-6">
            {/* Nama Barang */}
            <View className="space-y-2 mb-6">
              <Text className="text-xs font-bold text-white tracking-widest mb-2">NAMA BARANG</Text>
              <TextInput 
                className="w-full border-none rounded-xl py-4 px-5 text-sm text-white"
                style={{ backgroundColor: '#101C26' }}
                placeholder="Masukkan nama barang..."
                placeholderTextColor="#8E9BA7"
                value={title}
                onChangeText={setTitle}
                maxLength={180}
              />
            </View>

            {/* Lokasi Kampus */}
            <View className="space-y-3 mb-6">
              <Text className="text-xs font-bold text-white tracking-widest mb-2">LOKASI KAMPUS</Text>
              
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setIsLocationModalVisible(true)}
                className="w-full rounded-xl py-4 px-5 flex-row justify-between items-center"
                style={{ backgroundColor: '#101C26' }}
              >
                <Text style={{ color: location ? 'white' : '#8E9BA7', fontSize: 14 }}>
                  {location || 'Pilih Lokasi Barang...'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color={theme.colors.primary} />
              </TouchableOpacity>

              {location === 'Lokasi Lainnya' && (
                <TextInput 
                  className="w-full border border-dashed rounded-xl py-4 px-5 text-sm text-white italic mt-3"
                  style={{ backgroundColor: 'transparent', borderColor: '#1E2D3D' }}
                  placeholder="Tulis kustom lokasi jika pilih 'Lokasi Lainnya'..."
                  placeholderTextColor="#8E9BA7"
                  value={customLocation}
                  onChangeText={setCustomLocation}
                  maxLength={255}
                />
              )}
            </View>

            {/* Deskripsi */}
            <View className="space-y-2 mb-6">
              <Text className="text-xs font-bold text-white tracking-widest mb-2">DESKRIPSI / CIRI CIRI</Text>
              <TextInput 
                className="w-full rounded-xl py-4 px-5 text-sm text-white"
                style={{ backgroundColor: '#101C26' }}
                placeholder="Warna :&#10;Jumlah :&#10;Merk :&#10;Ukuran :"
                placeholderTextColor="#8E9BA7"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Upload Section */}
            <TouchableOpacity 
              onPress={pickImage}
              activeOpacity={0.7}
              className="rounded-2xl h-32 flex-col items-center justify-center p-4 border-2 border-dashed mb-6 overflow-hidden"
              style={{ backgroundColor: 'rgba(16, 28, 38, 0.3)', borderColor: '#1E2D3D' }}
            >
              {image ? (
                <>
                  <Image source={{ uri: image.uri }} className="absolute w-full h-full opacity-60" resizeMode="cover" />
                  <View className="bg-black/50 p-2 rounded-lg items-center">
                    <MaterialCommunityIcons name="image-edit" size={24} color={theme.colors.primary} />
                    <Text className="text-white font-bold text-sm mt-1">Ganti Foto</Text>
                  </View>
                </>
              ) : (
                <>
                  <Text className="text-white font-bold text-sm">+ Unggah Foto</Text>
                  <Text className="text-[10px] mt-1" style={{ color: '#8E9BA7' }}>Format JPG, PNG (Maks. 5MB)</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity 
              onPress={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl items-center justify-center mt-2 mb-10"
              style={{ backgroundColor: theme.colors.primary, opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#050A10" />
              ) : (
                <Text className="font-bold text-lg" style={{ color: '#050A10' }}>Kirim Laporan</Text>
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
          className="flex-1 justify-end bg-black/60"
          activeOpacity={1}
          onPress={() => setIsLocationModalVisible(false)}
        >
          <View className="bg-[#101C26] rounded-t-3xl p-6 pb-12 max-h-[70%]">
            <View className="w-12 h-1.5 bg-[#2D4258] rounded-full self-center mb-6" />
            <Text className="text-white font-bold text-lg mb-4">Pilih Lokasi</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {predefinedLocations.map((loc, idx) => {
                if (idx === 0) return null; // Skip placeholder
                const isSelected = location === loc;
                return (
                  <TouchableOpacity 
                    key={loc}
                    className="py-4 border-b border-[#1E2D3D] flex-row justify-between items-center"
                    onPress={() => {
                      setLocation(loc);
                      setIsLocationModalVisible(false);
                    }}
                  >
                    <Text className={`text-base ${isSelected ? 'text-[#0AF3B9] font-bold' : 'text-white'}`}>
                      {loc}
                    </Text>
                    {isSelected && <MaterialCommunityIcons name="check" size={20} color="#0AF3B9" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ReportView;
