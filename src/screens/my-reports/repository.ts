import { api } from "@/src/libs/api";
import { ReportItem } from "@/src/libs/types";

export const MyReportsRepository = {
  endpoint: "/reports/",
  
  getMyReports: async (userId: string, params?: Record<string, string>): Promise<ReportItem[]> => {
    try {
      // Fetch all reports
      const response = await api.get(MyReportsRepository.endpoint, { params });
      let data: ReportItem[] = response.data.results || response.data;
      
      // Filter locally by user ID since there is no specific my-reports endpoint
      if (Array.isArray(data) && userId) {
        data = data.filter(item => item.user && item.user.id === userId);
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching my reports:", error);
      throw error;
    }
  }
};
