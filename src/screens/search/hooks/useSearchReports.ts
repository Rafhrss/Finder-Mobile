// Third-party Imports
import useSWRInfinite from 'swr/infinite';

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

  const getKey = (pageIndex: number, previousPageData: ReportItem[] | null) => {
    // Reached the end
    if (previousPageData && !previousPageData.length) return null;

    // We pass the key as an array including pageIndex so SWR knows it's different per page
    return ['/reports', query, statusParam, pageIndex] as const;
  };

  const fetcher = async (keyInfo: readonly [string, string, string, number]) => {
    const [, q, status, pageIndex] = keyInfo;
    const params: Record<string, string> = {
      limit: '10',
      offset: (pageIndex * 10).toString()
    };
    if (q) params.q = q;
    if (status) params.status = status;
    return SearchRepository.getSearchReports(params);
  };

  const { data, size, setSize, error, mutate: swrMutate } = useSWRInfinite(getKey, fetcher);

  const reports = data ? Array.from(new Map(data.flat().map(item => [item.id, item])).values()) : [];
  
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

  const mutate = (newData?: ReportItem[][]) => {
    if (!newData) return swrMutate();
    return swrMutate(newData, { revalidate: false });
  };

  return {
    reports,
    isLoading: isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isError: !!error,
    error,
    size,
    setSize,
    mutate
  };
};
