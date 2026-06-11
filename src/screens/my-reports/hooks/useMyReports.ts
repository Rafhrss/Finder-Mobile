import useSWR from 'swr';
import { MyReportsRepository } from '../repository';
import type { ReportItem } from '@/src/libs/types';
import { useAuthProfile } from '@/src/hooks/useAuthProfile';

export const useMyReports = (statusTab: "all" | "lost" | "found" | "done") => {
  const { user } = useAuthProfile();

  let statusParam = "";
  if (statusTab === "lost") statusParam = "LOST";
  if (statusTab === "found") statusParam = "FOUND";
  if (statusTab === "done") statusParam = "CLAIMED";

  const fetcher = async () => {
    if (!user?.id) return [];
    
    const params: Record<string, string> = {};
    if (statusParam) params.status = statusParam;
    return MyReportsRepository.getMyReports(user.id, params);
  };

  const { data, error, mutate, isLoading } = useSWR<ReportItem[]>(
    user?.id ? ['/reports/my-reports', user.id, statusParam] : null,
    fetcher
  );

  return {
    reports: data || [],
    isLoading,
    isError: !!error,
    error,
    mutate
  };
};
