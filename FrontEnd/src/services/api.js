import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Get Users (Read)
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data.data;
};

// ✅ Add User (Create)
export const addProduct = async (userData) => {
  const response = await axios.post(`${API_URL}/products`, userData);
  return response.data;
};

// ✅ Update User (Edit)
export const updateUser = async (userId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/products/${userId}`,
    updatedData
  );
  return response.data;
};

// ✅ Delete User
export const deleteProduct = async (userId) => {
  await axios.delete(`${API_URL}/products/${userId}`);
  return "User deleted (but not really)";
};

// ✅ Default export (Agar tum default export chahte ho)
const api = { getProducts, addProduct, updateUser, deleteProduct };
export default api;
