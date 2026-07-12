import { api } from "../../lib/api";

export const driverApi = {
  create: (payload) => api.post("/drivers", payload),
  getAll: (query = "") => api.get(`/drivers${query}`),
  getOne: (id) => api.get(`/drivers/${id}`),
};