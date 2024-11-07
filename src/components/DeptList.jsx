import { useEffect, useState } from "react";
import { fetchDept } from "../api/deptService.js";

const UserList = () => {
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
            }
            finally{
                setLoading(false)
            }
        }

        loadDepts();
    }, [])

    if (loading) return <p>Carregando departamentos...</p>

    return (
        <>
            <h2>Departamentos:</h2>
            <ul>
                {depts.map(user => (
                    <li key={user.id_dept}>{user.nm_dept}</li>
                ))}
            </ul>
        </>
    )
}

export default UserList;