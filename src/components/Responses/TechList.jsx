import { useEffect, useState } from "react";
import { fetchTech } from "../../api/techService";
import { toast } from "react-toastify";


const TechList = ({ value, onChange }) => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTech = async () => {
      try {
        const techData = await fetchTech();
        setTechs(techData);
      } catch (error) {
        toast.error("Erro ao carregar Técnicos");
      } finally {
        setLoading(false);
      }
    };

    loadTech();
  }, []);

  return (
    <select
      name="tech"
      id="tech"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      
      {loading ? (
        <option value="loading">Carregando...</option>
      ) : techs.length > 0 ? (
        techs.map((tech) => (
          <option
            key={tech.id_tec}
            value={tech.id_tec}
          >
            {tech.nm_tec}
          </option>
        ))
      ) : (
        <option value="no-techs">Técnicos não encontradas</option>
      )}
    </select>
  );
};

export default TechList;
