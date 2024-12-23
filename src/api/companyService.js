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

export const updateSingleAttribute = async (id, field, value) => {
  try {
    const response = await api.put(`${API_URL}/upt-comp/${id}`, { field, value });

    console.log("Resposta da API:", response);

    if (response.status === 200) {
      toast.success("Campo atualizado com sucesso!", { autoClose: 700 });
    } else {
      toast.warn("Atualização realizada, mas com mensagens inesperadas.", { autoClose: 700 });
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar campo:", error);
    toast.error(
      error.response?.data?.message || "Erro ao atualizar o campo. Verifique os dados e tente novamente.",
      { autoClose: 900 }
    );
    throw error;
  }
};





export const deleteCompany = async (companyId) => {
  try {
    const response = await api.delete(`${API_URL}/companies?id_company=${companyId}`);

    if (response.status === 200) {
      toast.success(response.data.message, { autoClose: 900 });
      return true;
    } else {
      toast.error(response.data.error || "Erro ao deletar empresa.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao deletar empresa:", error);
    toast.error(error.response?.data?.error || "Erro ao deletar empresa.");
    return false;
  }
};

export const fetchCompanies = async (month, setCompanies) => {
  try {
    const response = await api.get(`${API_URL}/comp-month/${month}`);
    setCompanies(response.data);
  } catch (error) {
    console.error("Erro ao buscar empresas:", error);
    toast.error("Erro ao buscar empresas")
  }
};
