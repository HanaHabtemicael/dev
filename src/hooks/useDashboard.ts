import { useQuery } from "@tanstack/react-query";
import DashboardReportService from "@/services/DashboardReportService";

export interface Report {
    year: string;
    // Include other relevant properties based on your API response
    details: string; // Example additional property
}

// Define a more detailed type for the API response if needed
interface ApiResponse {
    data: Report;
    message: string;
    statusCode: number;
}

const useContractAgreementReport = (year: string) => {
  const { data, error, isLoading, isError, isSuccess } = useQuery<ApiResponse, Error>({
    queryKey: ["DashboardReport", year],
    queryFn: () => Report(year),
    // Enable the query only if the year is valid (or other relevant condition)
    enabled: !!year,
  });

  // Function to handle fetching data
  async function Report(year: string): Promise<ApiResponse> {
    try {
      const response = await DashboardReportService.getSummary(year);
      if (!response) throw new Error("Network response was not ok.");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch contract report data.");
    }
  }

  return {
    ContractReport: data?.data,  // Accessing nested data safely
    message: data?.message,
    isLoading,
    isError,
    isSuccess,
    error
  };
};

export { useContractAgreementReport };
