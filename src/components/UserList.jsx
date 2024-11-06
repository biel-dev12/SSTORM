import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userService.js";

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUsers = async () => {
            try{
                const usersData = await fetchUsers();
                setUsers(usersData);
            }
            catch (error) {
                console.error("Erro ao buscar Usuarios: ", error)
            }
            finally{
                setLoading(false)
            }
        }

        loadUsers();
    }, [])

    if (loading) return <p>Carregando usuários...</p>

    return (
        <>
            <h2>Usuarios:</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id_user}>{user.nm_username}</li>
                ))}
            </ul>
        </>
    )
}

export default UserList;