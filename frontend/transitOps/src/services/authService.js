import { api } from "../lib/api";

export const authService = {
  register: ({ name, email, password, role }) =>
    api.post("/auth/register", { name, email, password, role }),

  login: ({ email, password }) =>
    api.post("/auth/login", { email, password }),

  logout: () => api.post("/auth/logout"),

  me: () => api.get("/auth/me"),
};