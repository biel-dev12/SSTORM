import { API_URL, api } from "./config";

export const fetchTServices = async () => {
    try{
        const res = await api.get(`${API_URL}/tservices`)

        return res.data
    }
    catch (error){
        console.log("Erro ao buscar tipos de serviços", error)
        throw error
    }
}

export const getTypeServiceById = async (idTService) => {
    try {
      const res = await api.get(`${API_URL}/tservice/${idTService}`);
      return res.data;
    } catch (error) {
      console.error(`Erro ao buscar tipo de serviço ${idTService}:`, error);
    }
  };
  