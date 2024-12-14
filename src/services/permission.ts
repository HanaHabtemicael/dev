import api from "./api";

class PermissionService {
    async getPermission() {
        return api.get(`/permissions`);
    }
}
export default new PermissionService();
