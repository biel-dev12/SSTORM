import { Main, Form, Title, InputsDiv, Field, Btn, Option } from "./style";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../components/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const username = e.target.username.value;
    const passw = e.target.passw.value;
  
    if (username === "ADM_Tec" && passw === "1234") {
      login();  
      navigate("/home");
    } else {
      alert("Usuário ou senha inválidos!");
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
            />
          </Field>
          <Field>
            <label htmlFor="passw">Senha:</label>
            <input type="password" name="passw" id="passw" />
          </Field>
        </InputsDiv>

      <Btn type="submit">Entrar</Btn>

      <Option>Ainda Não tem uma conta?<Link to="/signup"><span>Cadastre-se!</span></Link></Option>
      </Form>
    </Main>
  );
}

export default Login;
