"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import FarmerService from "../services/FarmerService";
export type Farmer = {
  id: number;
  OfftakerFarmerID: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  PhoneNumber: string;
  MembershipStatus: string;
  kebele: string;
  ClusterName: string;
  Kebele: string;
  Gender: string;
  FamilySize: number;
  Age: number;
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
  searchQuery?: string,
  FarmerType?: string
) => {
  return useQuery({
    queryKey: ["farmers", page, limit, searchQuery, FarmerType],
    queryFn: async () => {
      const response = await FarmerService.getFarmers(
        page,
        limit,
        searchQuery,
        FarmerType
      );
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

// Mutation hook to update farmer details
const useUpdateFarmer = () => {
  return useMutation({
    mutationFn: ({
      id,
      field,
      value,
    }: {
      id: string;
      field: string;
      value: any;
    }) => FarmerService.updateFarmerDetails(id, field, value),
  });
};

// Mutation hook to update farmland details
const useUpdateFarmland = () => {
  return useMutation({
    mutationFn: ({
      id,
      field,
      value,
    }: {
      id: string;
      field: string;
      value: any;
    }) => FarmerService.updateFarmlandDetails(id, field, value),
  });
};

// Mutation hook to update document images
const useUpdateDocumentImage = () => {
  return useMutation({
    mutationFn: ({ documentId, file }: { documentId: string; file: File }) =>
      FarmerService.updateDocumentImage(documentId, file),
  });
};

export {
  useFarmers,
  useGetFarmer,
  useGetFarmersForExport,
  useFarmerDetail,
  useGetAllFarmers,
  useUpdateFarmer,
  useUpdateFarmland,
  useUpdateDocumentImage,
};