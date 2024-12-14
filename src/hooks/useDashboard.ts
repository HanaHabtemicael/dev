import { useQuery } from "@tanstack/react-query";
import DashboardService from "@/services/DashboardReportService";

const useAnalysis = (timePeriod = 'year') => {
  return useQuery({
    queryKey: ["Report", timePeriod],  // Include timePeriod in the queryKey
    queryFn: async () => {
      const response = await DashboardService.getSummary(timePeriod);
      return response.data.data;  // Ensure your API returns 'data' as expected
    },
    onError: (error) => {
      console.error('Error fetching report data:', error);  // Log any errors for debugging
    },
    retry: 2,  // Optionally retry failed requests
  });
};

export { useAnalysis };
