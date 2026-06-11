import useSWR from 'swr';
import { ProfileRepository } from '../repository';
import type { UserInfo } from '@/src/libs/types';

export const useUserProfile = (userToken: string | null) => {
  const { data, mutate: swrMutate, isLoading, ...rest } = useSWR<UserInfo | null>(
    userToken ? ['/users/me', userToken] : null,
    () => ProfileRepository.getUserProfile(userToken as string)
  );

  const mutate = (newData?: UserInfo) => {
    if (!newData) return swrMutate();
    return swrMutate(newData, { revalidate: false });
  };

  return {
    ...rest,
    data,
    user: data,
    isLoading,
    mutate,
  };
};
