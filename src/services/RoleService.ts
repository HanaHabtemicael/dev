import api from "./api";

class RoleService {
  async getRoles(page: number = 1, limit: number = 5, searchQuery: string = "") {
    return api.get(`/iam/roles/paginate?page=${page}&limit=${limit}&search=${searchQuery}`);
  }
  async getRoleDetail(id:  number) {
    return api.get(`/iam/roles/${id}`);
  }

  async addRole(role: any) {
    return api.post("/iam/roles/create_with_permissions", role);
  }

  async updateRole(id:string,updateAgent: any) {
    return api.put(`/iam/role-permission/${id}`, updateAgent);
  }
  async deleteRole(id: any) {
    return api.delete(`/iam/users/activate/${id}`);
  }
  async getRole() {
    return api.get(`/roles`);
    // return api.get(`/iam/roles?page=1&limit=1&search=${query.search}`);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new RoleService();
