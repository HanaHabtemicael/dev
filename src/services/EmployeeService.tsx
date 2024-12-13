import api from "./api";

class EmployeeService {
  async getEmployees(page: number, limit?: number, searchQuery?: string) {
    let url = `/iam/users/paginate?page=${page}&limit=${limit}`;
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    return api.get(url);
  }

  async getEmployeeDetail(id: string) {
    return api.get(`/iam/users/${id}`);
  }

  async addEmployee(newEmployee: any) {
    return await api.post("/iam/users", newEmployee);
  }
  async employeeActivation(id: String) {
    return await api.put(`/iam/users/activate/${id}`);
  }
  async employeeUpdate(id: String, data: any) {
    return await api.put(`/iam/users/${id}`, data);
  }
  async updateUserPassword(id, password) {
    return api.put(`/iam/users/change-password/${id}`, {
      password,
    });
  }

  async getEmployeeWithSearch(query: { search: string }) {
    return api.get(`/iam/users?page=1&limit=6&search=${query.search}`);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployeeService();
