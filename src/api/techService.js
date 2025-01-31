import { API_URL, api } from "./config";

export const fetchTech = async () => {
    try{
        const res = await api.get(`${API_URL}/techs`)

        return res.data
    }
    catch (error){
        console.log("Erro ao buscar tipos de serviços", error)
        throw error
    }
}