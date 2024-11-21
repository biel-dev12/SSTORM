import { Main, Form, Title, InputsDiv, Field, Btn, Option } from "./style";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../api/userService";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    passw: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.passw) {
      toast.error("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    try {
      const { user } = await loginUser(formData);
      toast.success("Login realizado com sucesso!", {
        autoClose: 1000
      });
      setTimeout(() => {
        login(user);
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <Title>Entrar</Title>

        <InputsDiv>
          <Field>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Gabriel_tec"
              value={formData.username}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <label htmlFor="passw">Senha:</label>
            <input
              type="password"
              name="passw"
              id="passw"
              value={formData.passw}
              onChange={handleChange}
            />
          </Field>
        </InputsDiv>

        <Btn type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Btn>

        <Option>
          Ainda Não tem uma conta?
          <Link to="/signup">
            <span>Cadastre-se!</span>
          </Link>
        </Option>
      </Form>
    </Main>
  );
}

export default Login;
