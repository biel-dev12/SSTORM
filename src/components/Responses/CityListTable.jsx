import { useEffect, useState } from "react";
import { fetchCities } from "../../api/cityService";
import { toast } from "react-toastify";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: auto;
  padding: 0;
  font-size: 0.6rem;
  text-align: center;
  background-color: transparent;
  border: none;
  outline: none;
`;

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
    <StyledSelect
      value={value}
      onChange={(e) => onChange(e.target.value)} // Atualiza o valor quando uma cidade é selecionada
    >
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
    </StyledSelect>
  );
};

export default CityList;
