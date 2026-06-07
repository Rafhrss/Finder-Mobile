import { useAuth } from "@/src/contexts/AuthContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { Alert, View } from "react-native";
import { Button, Text } from "react-native-paper";

const UserProfile = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          await logout();
          try {
            await GoogleSignin.signOut();
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#060E17] px-6">
      <Text variant="headlineSmall" className="mb-4">
        Profile Saya
      </Text>
      <Text variant="bodyMedium" className="mb-8 text-center">
        Anda sudah berhasil login. Konten profil detail akan ditambahkan nanti.
      </Text>

      <Button mode="contained" onPress={handleLogout} buttonColor="#D32F2F">
        Keluar (Logout)
      </Button>
    </View>
  );
};

export default UserProfile;
