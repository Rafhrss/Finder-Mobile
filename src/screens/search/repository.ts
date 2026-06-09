import { api } from "@/src/libs/api";
import type { ReportItem } from "@/src/libs/types";

export const SearchRepository = {
  endpoint: "/reports",

  async getSearchReports(params: { q?: string; status?: string }): Promise<ReportItem[]> {
    const { data } = await api.get<ReportItem[]>(`${this.endpoint}/`, { params });
    return data;
  },
};
