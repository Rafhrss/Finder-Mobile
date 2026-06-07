import { useAuth } from "@/src/contexts/AuthContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LoginScreen from "../components/LoginScreen";
import UserProfile from "../components/UserProfile";

const ProfileView = () => {
  const { userToken, isLoading } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    });
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#060E17]">
        <Text variant="bodyMedium">Memuat...</Text>
      </View>
    );
  }

  // JIKA SUDAH LOGIN
  if (userToken) {
    return <UserProfile />;
  }

  // JIKA BELUM LOGIN
  return <LoginScreen />;
};

export default ProfileView;
