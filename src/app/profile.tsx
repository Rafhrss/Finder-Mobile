import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { GoogleSignIn } from "../components/auth/GoogleSignIn";
import { supabase } from "../libs/supabase";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_GOOGLE_CLIENT_ID,
});

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error("Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#060E17] px-6 gap-y-2">
      {user ? (
        <>
          {user.user_metadata?.avatar_url && (
            <Image
              source={{ uri: user.user_metadata.avatar_url }}
              className="w-24 h-24 rounded-full mb-2"
            />
          )}
          <Text
            variant="headlineSmall"
            className="text-white font-bold text-center"
          >
            {user.user_metadata?.full_name || user.email}
          </Text>
          <Text variant="bodyMedium" className="text-gray-400 mb-6 text-center">
            {user.email}
          </Text>
          <Button
            mode="outlined"
            onPress={signOut}
            loading={loading}
            disabled={loading}
            textColor="white"
            style={{ borderColor: "white" }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Text
            variant="headlineSmall"
            className="text-white font-bold text-center mb-2"
          >
            Profil
          </Text>
          <Text variant="bodyMedium" className="text-gray-400 mb-6 text-center">
            Silakan login untuk melanjutkan.
          </Text>
          <GoogleSignIn />
        </>
      )}
    </View>
  );
};

export default Profile;
