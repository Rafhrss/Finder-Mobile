import useSWR from "swr";
import { api } from "@libs/api";
import { useAuth } from "../contexts/AuthContext";
import type { UserInfo } from "@libs/types";

export const useAuthProfile = () => {
  const { userToken } = useAuth();

  const fetcher = async (url: string) => {
    if (!userToken) throw new Error("No token");
    const response = await api.get<UserInfo>(url, {
      headers: { Authorization: `Token ${userToken}` },
    });
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    userToken ? "/users/me/" : null,
    fetcher,
  );

  return {
    user: data,
    isLoading,
    isError: !!error,
    mutate,
  };
};
