import { useEffect, useState } from "react";
import { fetchDept } from "../api/deptService.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeptList = () => {
    const [depts, setDepts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadDepts = async () => {
            try{
                const deptsData = await fetchDept();
                setDepts(deptsData);
            }
            catch (error) {
                console.error("Erro ao buscar Usuarios: ", error)
                toast.error("Erro ao carregar os departamentos");
            }
            finally{
                setLoading(false)
            }
        }

        loadDepts();
    }, [])

    return (
        <select name="dept" id="dept">
            {loading ? (
                <option value="loading">Carregando...</option>
            ) : (
                depts.length > 0 ? (
                    depts.map((dept) => (
                        <option value={dept.nm_dept} key={dept.id_dept}>
                            {dept.nm_dept}
                        </option>
                    ))
                ) : (
                    <option value="no-depts">Nenhum departamento encontrado</option>
                )
            )}
        </select>
        
    )
}

export default DeptList;