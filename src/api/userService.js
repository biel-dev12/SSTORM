import { API_URL, api } from "./config";

export const fetchUsers = async () => {
  try {
    const res = await api.get(`${API_URL}/users`);
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar usuarios: ", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    console.log(userData);
    const res = await api.post(`${API_URL}/users`, userData);
    return res.data;
  } catch (error) {
    console.log("Erro ao registrar usuario:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await api.post(`${API_URL}/users/login`, userData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Erro no servidor. Tente novamente mais tarde.");
  }
};
