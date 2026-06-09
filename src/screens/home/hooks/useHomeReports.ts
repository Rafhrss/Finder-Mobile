// Third-party Imports
import useSWR from 'swr';

// Repository Imports
import { HomeRepository } from '../repository';

// Type Imports
import type { ReportItem } from '@/src/libs/types';

export const useHomeReports = () => {
  const {
    data,
    mutate: swrMutate,
    ...rest
  } = useSWR(['/reports', 'home'], () => HomeRepository.getReports());

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
