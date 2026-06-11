import useSWR from 'swr';
import { ReportDetailRepository } from '../repository';
import type { ReportItem } from '@/src/libs/types';

export const useReportDetail = (id: string, initialData?: ReportItem) => {
  const { data, mutate: swrMutate, ...rest } = useSWR<ReportItem>(
    ['/reports', id],
    () => ReportDetailRepository.getReportDetail(id),
    {
      fallbackData: initialData,
    }
  );

  const mutate = (newData?: ReportItem) => {
    if (!newData) return swrMutate();
    return swrMutate(newData, { revalidate: false });
  };

  return {
    ...rest,
    data,
    item: data,
    mutate,
  };
};
