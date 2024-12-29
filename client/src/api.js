import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // Ensures cookies are sent with requests
});

// Login endpoint
export const login = async (credentials) => {
  return api.post("/auth/login", credentials);
};

// Logout endpoint
export const logout = async () => {
  return api.post("/auth/logout");
};

// Fetch buckets
export const getBuckets = async () => {
  return api.get("/buckets");
};

export const getBucketObjects = async (bucketName) => {
  return api.get(`/bucket/${bucketName}/objects`);
};

export const putOneObject = async (bucketName, formData) => {
  return api.put(`/bucket/${bucketName}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Make sure the content-type is correct
    },
  });
};
export default api;
