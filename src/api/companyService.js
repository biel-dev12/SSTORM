import { API_URL, api } from "./config";
import { toast } from "react-toastify";

export const getCompany = async (field, company, setSelectedCompany) => {
  try {
    const response = await api.get(`${API_URL}/companies?${field}=${company}`);
    const data = await response.data;

    if (data && data.length > 0) {
      setSelectedCompany(data[0]);
    } else {
      setSelectedCompany(null);
      toast.warn("Empresa não encontrada!", { autoClose: 700 });

    }
  } catch (error) {
    console.log("Erro ao buscar empresa!", error)
    toast.warn("Erro ao buscar empresa!", { autoClose: 700 });
  }
};

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

export const updateCompany = async (companyId, companyData) => {
  try {
    const response = await api.put(
      `${API_URL}/companies/${companyId}`,
      companyData
    );

    if (response.status === 200) {
      toast.success(response.data.message, { autoClose: 700 });
    } else {
      toast.error(response.data.error || "Erro desconhecido.");
    }
  } catch (error) {
    toast.error(error.response?.data?.error || "Erro ao editar empresa.");
  }
};
