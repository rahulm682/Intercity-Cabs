import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface RouteData {
  _id: string;
  source: string;
  destination: string;
  price: number;
  vehicleType: string;
  description: string;
  isAvailable: boolean;
}

export interface FeedbackData {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface InquiryData {
  _id: string;
  name: string;
  mobile: string;
  routeInfo: string;
  message: string;
  journeyDate?: string;
  status: "New" | "Contacted" | "Booked" | "Cancelled";
  createdAt: string;
}

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

// API Functions
export const fetchRoutes = async (): Promise<RouteData[]> => {
  const response = await api.get("/routes");
  return response.data;
};

// Private: Create a new route
export const createRoute = async (
  routeData: Omit<RouteData, "_id">,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post("/routes", routeData, config);
  return response.data;
};

// Private: Update a route
export const updateRoute = async (
  id: string,
  routeData: Partial<RouteData>,
  token: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await api.put(`/routes/${id}`, routeData, config);
  return response.data;
};

// Private: Delete a route
export const deleteRoute = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.delete(`/routes/${id}`, config);
  return response.data;
};

// Public: Send Inquiry
export const sendInquiry = async (data: {
  name: string;
  mobile: string;
  message: string;
  routeInfo: string;
}) => {
  const response = await api.post("/inquiries", data);
  return response.data;
};

// Private: Get Inquiries
export const fetchInquiries = async (token: string) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get("/inquiries", config);
  return response.data;
};

// Public
export const fetchPublicFeedbacks = async () => {
  const response = await api.get("/feedbacks");
  return response.data;
};

export const createFeedback = async (data: {
  name: string;
  rating: number;
  comment: string;
}) => {
  const response = await api.post("/feedbacks", data);
  return response.data;
};

// Admin
export const fetchAllFeedbacks = async (token: string) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get("/feedbacks/admin", config);
  return response.data;
};

export const toggleFeedbackStatus = async (
  id: string,
  isApproved: boolean,
  token: string
) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.put(`/feedbacks/${id}`, { isApproved }, config);
  return response.data;
};

export const deleteFeedback = async (id: string, token: string) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.delete(`/feedbacks/${id}`, config);
  return response.data;
};

export const updateInquiryStatus = async (
  id: string,
  status: string,
  token: string
) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.put(`/inquiries/${id}`, { status }, config);
  return response.data;
};

export default api;
