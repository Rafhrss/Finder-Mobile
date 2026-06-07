import { api } from "@/src/libs/api";

export const ProfileRepository = {
  endpoint: "/users",

  async loginWithGoogle(idToken: string) {
    const { data } = await api.post(`${this.endpoint}/google/login/`, {
      id_token: idToken,
    });

    return data;
  },
};
