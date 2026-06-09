import { useAuth } from "@/src/contexts/AuthContext";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { isAxiosError } from "axios";
import React from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { ProfileRepository } from "../repository";

const LoginScreen = () => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // Hapus sesi Google sebelumnya agar selalu mendapat token segar
      await GoogleSignin.signOut();
      const response = await GoogleSignin.signIn();

      const idToken = response.data?.idToken;

      if (idToken) {
        const res = await ProfileRepository.loginWithGoogle(idToken);

        const appToken = res.key || res.access || res.token || idToken;

        await login(appToken);

        Alert.alert("Berhasil", "Anda telah sukses masuk ke akun Finder.");
      } else {
        Alert.alert(
          "Proses Dibatalkan",
          "Gagal menyelesaikan proses masuk dengan Google. Silakan coba lagi.",
        );
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        let judul = "Gagal Masuk";
        let pesan =
          "Terjadi gangguan saat menyambungkan ke server. Silakan coba beberapa saat lagi.";

        if (status === 400) {
          pesan =
            "Data login tidak valid atau belum dikonfigurasi dengan benar oleh admin.";
        } else if (status === 401 || status === 403) {
          pesan = "Akses ditolak. Sesi Anda mungkin sudah berakhir.";
        } else if (!status) {
          judul = "Koneksi Bermasalah";
          pesan = "Pastikan koneksi internet Anda stabil, lalu coba lagi.";
        }

        Alert.alert(judul, pesan);
      } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User membatalkan login");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Proses login sedang berjalan");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          "Layanan Google Tidak Aktif",
          "Perangkat ini tidak memiliki layanan Google Play yang dibutuhkan untuk fitur ini.",
        );
      } else {
        console.error("Terjadi error tak terduga:", error);
        Alert.alert(
          "Terjadi Kesalahan",
          "Mohon maaf, terjadi kendala sistem. Silakan coba lagi nanti.",
        );
      }
    }
  };

  return (
    <View className="flex-1 bg-[#0A1118] justify-center items-center px-6">
      <View className="items-center mb-14">
        <Image
          source={require("@/assets/images/icon_3.png")}
          className="w-32 h-32 mb-4"
          resizeMode="contain"
        />
        <Text className="text-white text-xl font-bold tracking-widest mt-2">
          UMKT <Text className="text-[#00E599]">FINDER</Text>
        </Text>
        <Text className="text-gray-400 text-[8px] font-bold tracking-[0.2em] mt-1">
          TEMUKAN • LAPORKAN • KEMBALIKAN
        </Text>
      </View>

      <Text className="text-white text-xl font-bold mb-8">Sign In</Text>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        className="w-full flex-row items-center justify-center py-3.5 px-4 rounded-xl border border-[#007A5E] mb-6"
        activeOpacity={0.7}
      >
        <Image
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
          }}
          className="w-5 h-5 mr-3"
          resizeMode="contain"
        />
        <Text className="text-white font-medium text-sm">
          Lanjutkan dengan email UMKT
        </Text>
      </TouchableOpacity>

      <View className="items-center">
        <Text className="text-gray-400 text-xs text-center mb-0.5">
          Wajib menggunakan akun resmi kampus
        </Text>
        <Text className="text-gray-400 text-xs text-center">
          (<Text className="text-gray-200 font-bold">@umkt.ac.id</Text>) untuk
          proses masuk.
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
