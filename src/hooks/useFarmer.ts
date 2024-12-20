"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import FarmerService from "../services/FarmerService";
import DashboardReportService from "@/services/DashboardReportService";

export type Farmer = {
  id: number;
  firstName: string;
  MiddleName: string;
  lastName: string;
  phoneNumber: string;
  MembershipStatus: string;
  kebele: string;
  ClusterName: string;
  Kebele: string;
  Gender: string;
  FamilySize: number;
  Age: number;
  email:string;
  IsWillingCFArrangement: string;
  NameofTheGroup: string;
  FarmerKnowledgeAgriPractices: string;
  FarmerKnowledgeFarmMgt: string;
  CurrentMarketingActivities: string;
  PotentialCompetitorsCFOffTaker: string;
  NameofPotentialCompetitorsCFOffTaker: string[];
  Grade: string;
  fullName: string;
  ParcelNumber_LC: number;
  LandSize: number;
  Latitude: string;
  address	:string,
  Longitude: string;
  FarmerType: string;
  AccessibilityforRoad: string;
  SecurityIssue: string;
  ExpectedDateofContractSignature: string;
  DistancetoFarm: string;
  DistancetoCollection: string;
  AccesstoMechanization: string;
  AccesstoTransport: string;
  AccesstoStorageFacilities: string;
  SoilType: string;
  ProfilePicture?: File | null;
  KebeleIdImage?: File | null;
  LandCertificate?: File | null;
};

// Fetch paginated farmers with optional search
const useGetFarmer = (page: number, limit: number, searchQuery?: string) => {
  return useQuery({
    queryKey: ["farmers", page, limit, searchQuery],
    queryFn: async () => {
      const response = await FarmerService.getFarmers(page, limit, searchQuery);
      return response.data;
    },
  });
};

// Fetch farmers for export
const useGetFarmersForExport = () => {
  return useQuery({
    queryKey: ["farmers"],
    queryFn: async () => {
      const response = await FarmerService.getAllFarmers();
      return response.data;
    },
  });
};

// Fetch all farmers with filters
const useGetAllFarmers = (
  page: number,
  limit?: any,
  
) => {
  return useQuery({
    queryKey: ["farmers", page, limit],
    queryFn: async () => {
      const response = await FarmerService.getFarmers(
        page,
        limit      );
      return response.data;
    },
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
};

const useFarmers = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await FarmerService.addFarmer(formData);
      return response.data;
    },
  });
};

// Fetch farmer detail by ID
const useFarmerDetail = (id: string) => {
  return useQuery({
    queryKey: ["farmer", id],
    queryFn: async () => {
      const response = await FarmerService.getDetail(id);
      return response.data;
    },
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
};
 const useDeleteFarmer = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await FarmerService.deleteFarmer(id);
      return response;
    },
  });
}
const useDashboard = () => {
  return useQuery({
    queryKey: ["farmer"],
    queryFn: async () => {
      const response = await DashboardReportService.getSummary();
      return response.data;
    },
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
};


// Mutation hook to update farmer details
const useUpdateFarmer = () => {
  return useMutation({
    mutationFn: ({ id, field }: { id: string; field: Record<string, any> }) =>
      FarmerService.updateFarmer({
        id,
        updateFarmerData: field,
      }),
  });
};


export {
  useFarmers,
  useGetFarmer,
  useGetFarmersForExport,
  useFarmerDetail,
  useGetAllFarmers,
  useUpdateFarmer,
  useDashboard,
  useDeleteFarmer
};
