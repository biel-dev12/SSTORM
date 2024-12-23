import { useState } from "react";
import CityList from "../components/Responses/CityListTable";

const Teste = () => {
  const [valueC, setValue] = useState();

  return (
    <>
      <h1>Lista: </h1>
      <p>Cidade selecionada: {valueC}</p>
      <CityList
        value={valueC}
        onChange={(value) => setValue(value)}
      />

      
    </>
  );
};

export default Teste;
