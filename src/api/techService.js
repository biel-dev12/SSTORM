import { API_URL, api } from "./config";

export const fetchTech = async () => {
  try {
    const res = await api.get(`${API_URL}/techs`);

    return res.data;
  } catch (error) {
    console.log("Erro ao buscar tipos de serviços", error);
    throw error;
  }
};

export const getTechById = async (idTech) => {
  if (!techId) return "N/A";

  try {
    const res = await api.get(`${API_URL}/tech/${idTech}`);
    return res.data;
  } catch (error) {
    console.error(`Erro ao buscar técnico ${techId}:`, error);
    return "N/A"; // Se houver erro, retorna "N/A"
  }
};
