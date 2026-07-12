import { api } from "../../lib/api";

export const vehicleApi = {
  create: (payload) => api.post("/vehicles", payload),
  getAll: (query = "") => api.get(`/vehicles${query}`),
  getOne: (id) => api.get(`/vehicles/${id}`),
};