import { API_URL, api } from "./config";

export const fetchSegments = async () => {
    try{
        const res = await api.get(`${API_URL}/segments`)

        return res.data
    }
    catch (error){
        console.log("Erro ao buscar segmentos", error)
        throw error
    }
}