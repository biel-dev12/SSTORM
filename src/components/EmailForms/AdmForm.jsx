import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { EMAIL_API } from "../../api/config.js";
import { Button } from "../../pages/SendEmail/SendEmail.js";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";


function AdmForm({ adm, onSave, onClose }) {
    const [numero, setNumero] = useState(adm?.Adm || "");
    const [nome, setNome] = useState(adm?.Nome || "");
    const [email, setEmail] = useState(adm?.["E-mail"] || "");
    const [proposta, setProposta] = useState(adm?.["Proposta Comercial"] || "");

    const handleSubmit = async () => {
        try {
            if (adm) {
                await axios.put(`${EMAIL_API}/administradoras/${adm.Adm}`, {
                    Adm: parseInt(numero),
                    Nome: nome,
                    "E-mail": email,
                    "Proposta Comercial": proposta
                });
                toast.success("Administradora atualizada!");
            } else {
                await axios.post(`${EMAIL_API}/administradoras`, {
                    Adm: parseInt(numero),
                    Nome: nome,
                    "E-mail": email,
                    "Proposta Comercial": proposta
                });
                toast.success("Administradora adicionada!");
            }
            onSave();
        } catch (error) {
            console.error("Erro ao salvar administradora:", error);
            toast.error("Erro ao salvar administradora.");
        }
    };

    return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>{adm ? "Editar Administradora" : "Adicionar Administradora"}</h3>

        <input
          style={inputStyle}
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Número da Adm"
        />
        <input
          style={inputStyle}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />

        <label style={{ margin: "10px 0 5px" }}>Proposta:</label>
        <ReactQuill
          theme="snow"
          value={proposta}
          onChange={setProposta}
          style={{ height: "200px", marginBottom: "10px" }}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"]
            ]
          }}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <Button onClick={handleSubmit} style={{marginTop: "15px"}}>Salvar</Button>
          <button onClick={onClose} style={{ background: "#ccc" }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

// --- estilos inline para modal ---
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "500px",
    maxHeight: "100%",
    maxWidth: "90%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
};

const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
};

export default AdmForm;
