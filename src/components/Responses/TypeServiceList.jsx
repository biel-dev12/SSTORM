import { useEffect, useState } from "react";
import { fetchTServices } from "../../api/typeService";
import { toast } from "react-toastify";


const TypeServiceList = ({ value, onChange }) => {
  const [tservice, setTService] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTservice = async () => {
      try {
        const tserviceData = await fetchTServices();
        setTService(tserviceData);
      } catch (error) {
        toast.error("Erro ao carregar serviços");
      } finally {
        setLoading(false);
      }
    };

    loadTservice();
  }, []);

  return (
    <select
      name="type_service"
      id="type_service"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Selecione um tipo</option>
      
      {loading ? (
        <option value="loading">Carregando...</option>
      ) : tservice.length > 0 ? (
        tservice.map((service) => (
          <option
            key={service.id_type_service}
            value={service.id_type_service}
          >
            {service.nm_type_service}
          </option>
        ))
      ) : (
        <option value="no-tservices">Serviços não encontradas</option>
      )}
    </select>
  );
};

export default TypeServiceList;
