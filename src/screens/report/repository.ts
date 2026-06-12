import { api } from "@/src/libs/api";
import type { ReportItem } from "@/src/libs/types";

export const ReportRepository = {
  endpoint: "/reports",

  async createReport(formData: FormData, token: string) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const { data } = await api.post(`${this.endpoint}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  async getReportDetail(id: string): Promise<ReportItem> {
    const { data } = await api.get(`${this.endpoint}/${id}/`);
    return data;
  },

  async updateReport(id: string, formData: FormData, token: string): Promise<ReportItem> {
    const { data } = await api.patch(`${this.endpoint}/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${token}`
      },
    });
    return data;
  },
};
