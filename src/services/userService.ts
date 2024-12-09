import api from "./api";

class UserService {
  async getUserRole() {
    return api.get(`/iam/users/profile`);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
