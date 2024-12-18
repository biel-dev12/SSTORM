import { API_URL, api } from "./config";

export const fetchCities = async () => {
    try{
        const res = await api.get(`${API_URL}/cities`)

        return res.data
    }
    catch (error){
        console.log("Erro ao buscar cidades", error)
        throw error
    }
}