import { api } from "@/src/libs/api";
import type { ReportItem } from "@/src/libs/types";

export const ReportDetailRepository = {
  endpoint: "/reports",

  async getReportDetail(id: string): Promise<ReportItem> {
    const { data } = await api.get(`${this.endpoint}/${id}/`);
    return data;
  },
};
