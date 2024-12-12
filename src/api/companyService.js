import { API_URL, api } from "./config";
import { toast } from "react-toastify";

export const newCompany = async (companyData) => {
  try {
    const response = await api.post(`${API_URL}/companies`, companyData);

    if (response.status === 201) {
      toast.success(response.data.message, {autoClose: 700});
    } else {
      toast.error(response.data.error || "Erro desconhecido.");
    }
  } catch (error) {
    toast.error(error.response?.data?.error || "Erro ao criar empresa.");
  }
};
