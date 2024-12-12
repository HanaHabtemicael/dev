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
  async updateFarmerDetails(id: string, field: string, value: any) {
    try {
      const response = await api.put(`/farmers/${id}`, { [field]: value });
      return response.data;
    } catch (error) {
      console.error("Error updating farmer details:", error);
      throw error;
    }
  }

  async updateFarmlandDetails(id: string, field: string, value: any) {
    try {
      const response = await api.put(`/farm_land/${id}`, { [field]: value });
      return response.data;
    } catch (error) {
      console.error("Error updating farmland details:", error);
      throw error;
    }
  }

  // Method to update document images
  async updateDocumentImage(documentId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append("document", file);

      const response = await api.put(`/document/${documentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating document image:", error);
      throw error;
    }
  }
  async getAllFarmers() {
    return api.get("/farmer/find_all");
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new FarmerService();
