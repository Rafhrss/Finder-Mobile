import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Avatar, Divider, Menu, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../contexts/AuthContext";

import { useAuthProfile } from "@/src/hooks/useAuthProfile";

// --- Custom Hook for Google User ---
const useGoogleUser = (userToken: string | null) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userToken) {
        try {
          const userInfo = await GoogleSignin.getCurrentUser();
          setUser(userInfo);
        } catch (error) {
          console.error("Failed to fetch Google user:", error);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, [userToken]);

  return user;
};

// --- Sub-component: User Menu ---
type UserMenuProps = {
  user: User | null;
  userToken: string | null;
  logout: () => Promise<void>;
  colors: any;
};

const UserMenu = ({ user, userToken, logout, colors }: UserMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const handleProfile = useCallback(() => {
    closeMenu();
    DeviceEventEmitter.emit("JUMP_TO_TAB", "profile");
  }, [closeMenu]);

  const handleLogout = useCallback(() => {
    closeMenu();
    Alert.alert("Konfirmasi Logout", "Anda ingin keluar dari akun ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          await logout();
          DeviceEventEmitter.emit("JUMP_TO_TAB", "profile");
        },
      },
    ]);
  }, [closeMenu, logout]);

  const fullName = user?.user?.name || "Pengguna";

  return (
    <View className="mr-3">
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        style={{ marginTop: 4 }}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            {user?.user?.photo ? (
              <Avatar.Image size={34} source={{ uri: user.user.photo }} />
            ) : (
              <Avatar.Icon size={34} icon="account" />
            )}
          </TouchableOpacity>
        }
        contentStyle={{ backgroundColor: colors.surfaceVariant }}
      >
        {userToken ? (
          <>
            <View className="px-4 py-3">
              <Text
                className="text-base font-bold"
                style={{ color: colors.onSurface }}
              >
                {fullName}
              </Text>
            </View>
            <Divider />
            <Menu.Item
              onPress={handleProfile}
              title="Profil"
              leadingIcon="account-outline"
              titleStyle={{ color: colors.onSurfaceVariant }}
            />
            <Divider />
            <Menu.Item
              onPress={handleLogout}
              title="Logout"
              leadingIcon={(props) => <MaterialCommunityIcons {...props} name="logout" color="#EF4444" />}
              titleStyle={{ color: "#EF4444" }}
            />
          </>
        ) : (
          <Menu.Item
            onPress={handleProfile}
            title="Login"
            leadingIcon="login"
            titleStyle={{ color: colors.primary }}
          />
        )}
      </Menu>
    </View>
  );
};

// --- Main Appbar ---
const MainAppbar = () => {
  const { colors } = useTheme();
  const { logout, userToken } = useAuth();
  const user = useGoogleUser(userToken);
  const { user: authUser } = useAuthProfile();

  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: colors.surfaceVariant }}
    >
      <View className="mx-1">
        <Image
          source={require("@assets/images/icon_3.png")}
          className="h-[70px] w-[70px]"
          resizeMode="contain"
        />
      </View>
      <Appbar.Content
        title="FINDER"
        color={colors.onSurfaceVariant}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
      />
      {authUser?.is_admin && (
        <View className="bg-red-500/20 border border-red-500/50 px-2 py-0.5 rounded-md mr-3">
          <Text className="text-red-500 text-[10px] font-bold tracking-wider">ADMIN</Text>
        </View>
      )}
      <UserMenu
        user={user}
        userToken={userToken}
        logout={logout}
        colors={colors}
      />
    </Appbar.Header>
  );
};

export default MainAppbar;
