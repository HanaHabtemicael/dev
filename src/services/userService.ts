import api from "./api";

class UserService {
  
  async addUser(newUser: any) {
    return await api.post("/user/create_user_account", newUser);
  }
  async getUserList() {
    return api.get(`/user/findAll_users`);
  }
  
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
