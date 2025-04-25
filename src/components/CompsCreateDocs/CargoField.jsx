import { FormGroup, FormRow, DeleteBtn } from "../../pages/CreateDocs/CreateLtcat/styles";

const CargoField = ({ cargo, onChange, onRemove }) => (
  <FormRow style={{ alignItems: "flex-end", margin: "10px"}}>
    <FormGroup size={0.4}>
      <label>Cargo:</label>
      <input
        type="text"
        value={cargo.titulo}
        onChange={(e) => onChange("titulo", e.target.value)}
        required
      />
    </FormGroup>
    <FormGroup size={0.5}>
      <label>Descrição:</label>
      <input
        type="text"
        value={cargo.descricao}
        onChange={(e) => onChange("descricao", e.target.value)}
        required
      />
    </FormGroup>
    <FormGroup size={0.1}>
      <DeleteBtn type="button" onClick={onRemove}>
        Remover
      </DeleteBtn>
    </FormGroup>
  </FormRow>
);

export default CargoField;