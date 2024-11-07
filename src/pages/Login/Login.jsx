import { Main, Form, Title, InputsDiv, Field, Btn, Option } from "./style";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Main>
      <Form action="">
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
