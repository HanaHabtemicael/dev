import api from "./api";

class DashboardService {
    async getSummary(year: string) {
      return api.get(`/analytics/dashboard/${year}`);
    }

    
  }
  // eslint-disable-next-line import/no-anonymous-default-export
  export default new DashboardService();