import { useEffect, useState } from "react";
import { fetchCities } from "../../api/cityService";
import { toast } from "react-toastify";

const CityList = ({ value, onChange }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
      } catch (error) {
        toast.error("Erro ao carregar cidades");
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  return (
    <select
      name="city"
      id="city"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Selecione uma Cidade</option>

      {loading ? (
        <option value="loading">Carregando...</option>
      ) : cities.length > 0 ? (
        cities.map((city) => (
          <option key={city.id_city} value={city.id_city}>
            {city.sg_city}
          </option>
        ))
      ) : (
        <option value="no-cities">Cidades não encontradas</option>
      )}
    </select>
  );
};

export default CityList;
