import api from "./api";

class UserService {
  async getUserRole() {
    return api.get(`/iam/users/profile`);
  }
  async getUserList() {
    return api.get(`/user/findAll_users`);
  }
  
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
