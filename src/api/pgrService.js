import { API_URL, api } from "./config";

export const updatePgr = async (idPgr, cd_company_id, data) => {
  try {
    const response = await api.put(`${API_URL}/pgr/${idPgr}/${cd_company_id}`, data);
    console.log(response.data)

    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(response.data.error || "Erro ao atualizar o PGR.");
    }
  } catch (error) {
    console.error("Erro ao atualizar o PGR:", error.message);
    throw error;
  }
};

export const getPgrByCompany = async (companyId) => {
  try {
    const response = await api.get(`${API_URL}/pgr/${companyId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn(`Nenhum PGR encontrado para a empresa ${companyId}`);
      return [];
    }
    console.error("Erro ao buscar dados do PGR:", error);
    throw error;
  }
};

