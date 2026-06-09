import { api } from "@/src/libs/api";
import type { ReportItem } from "@/src/libs/types";

export const HomeRepository = {
  endpoint: "/reports",

  async getReports(): Promise<ReportItem[]> {
    const { data } = await api.get(`${this.endpoint}/`);
    return data;
  },
};
