// Third-party Imports
import useSWR from 'swr';

// Repository Imports
import { SearchRepository } from '../repository';

// Type Imports
import type { ReportItem } from '@/src/libs/types';

export const useSearchReports = (query: string, statusTab: "all" | "lost" | "found" | "done") => {
  // Convert statusTab to API format
  let statusParam = "";
  if (statusTab === "lost") statusParam = "LOST";
  if (statusTab === "found") statusParam = "FOUND";
  if (statusTab === "done") statusParam = "CLAIMED";

  const params: Record<string, string> = {};
  if (query) params.q = query;
  if (statusParam) params.status = statusParam;

  const {
    data,
    mutate: swrMutate,
    ...rest
  } = useSWR(
    ['/reports', query, statusParam],
    () => SearchRepository.getSearchReports(params)
  );

  const mutate = (newData?: ReportItem[]) => {
    if (!newData) return swrMutate();

    return swrMutate(newData, { revalidate: false });
  };

  return {
    ...rest,
    data,
    reports: data || [],
    mutate
  };
};
