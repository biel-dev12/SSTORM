import {
  FormGroup,
  FormRow,
  DeleteBtn,
} from "../../pages/CreateDocs/CreateLtcat/styles";

const SetorField = ({ setor, index, onChange, onRemove }) => (
  <FormRow style={{ alignItems: "flex-end", marginBottom: "10px" }}>
    <FormGroup size={0.3}>
      <label>Nome do Setor:</label>
      <input
        type="text"
        value={setor.nome}
        onChange={(e) => onChange(index, "nome", e.target.value)}
        required
      />
    </FormGroup>
    <FormGroup size={0.6}>
      <label>Descrição:</label>
      <input
        type="text"
        value={setor.descricao}
        onChange={(e) => onChange(index, "descricao", e.target.value)}
        required
      />
    </FormGroup>
    <FormGroup size={0.1}>
      <DeleteBtn type="button" onClick={() => onRemove(index)} disabled={false}>
        Remover
      </DeleteBtn>
    </FormGroup>
  </FormRow>
);

export default SetorField;
