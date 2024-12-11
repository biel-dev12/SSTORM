import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao parsear o JSON:", error);
      }
    }
  }, []);

  const login = (userData) => {
    // console.log("User data recebido para login:", userData);
    // setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData && userData.id_user) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.error("Dados de usuário inválidos:", userData);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
