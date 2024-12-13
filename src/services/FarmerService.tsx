import api from "./api";

class FarmerService {
  async getFarmers(
    page: number,
    limit?: number,
    searchQuery?: string,
  ) {
    let url = `farmer/find_all?page=${page}&limit=${limit}`;
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    
    return api.get(url);
  }

  async getDetail(id: string) {
    return api.get(`/farmer/find_farmer/${id}`);
  }

  async addFarmer(formData: FormData) {
    try {
      const response = await api.post("/farmers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error adding farmer:", error);
      throw error;
    }
  }
  
  async updateFarmer(query:any) {
    return api.put(`/farmer/update_farmer/${query.id}`, query);
  }

  

  // Method to update document images
  
  async getAllFarmers() {
    return api.get("/farmer/find_all");
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new FarmerService();
