import { API_URL, api } from "./config";

export const updatePgr = async (idPgr, cd_company_id, data) => {
  try {
    const response = await api.put(`${API_URL}/pgr/${idPgr}/${cd_company_id}`, data);

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
