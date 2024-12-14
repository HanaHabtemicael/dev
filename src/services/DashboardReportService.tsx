import api from "./api";

class DashboardService {
  // Accept 'timePeriod' as a parameter to handle dynamic time periods
  async getSummary(timePeriod = 'year') {
    return api.get(`/analytics/dashboard/${timePeriod}`);  // Use the dynamic timePeriod
  }
}

// Export a single instance of DashboardService
export default new DashboardService();
