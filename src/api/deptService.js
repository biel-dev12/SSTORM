import { API_URL, api } from "./config"

export const fetchDept = async () => {
  try{
    const res = await api.get(`${API_URL}/depts`)
    return res.data
  }
  catch (error){
    console.log("Erro ao buscar departamentos", error)
    throw error
  }
}