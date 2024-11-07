import { API_URL, api } from "./config"

export const fetchUsers = async () => {
    try{
        const res = await api.get(`${API_URL}/users`)
        return res.data
    }
    catch(error){
        console.error("Erro ao buscar usuarios: ", error)
        throw error
    }
}