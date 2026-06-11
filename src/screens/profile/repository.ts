import { api } from "@/src/libs/api";
import type { UserInfo } from "@/src/libs/types";

export const ProfileRepository = {
  endpoint: "/users",

  async loginWithGoogle(idToken: string) {
    const { data } = await api.post(`${this.endpoint}/google/login/`, {
      id_token: idToken,
    });

    return data;
  },

  async getUserProfile(token: string): Promise<UserInfo> {
    const { data } = await api.get(`${this.endpoint}/me/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return data;
  },
};
