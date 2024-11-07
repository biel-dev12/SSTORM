import { Main, Form, Title, InputsDiv, Field, Btn } from "./style";

function Login() {
  return (
    <Main>
      <Form action="">
        <Title>Entrar</Title>

        <InputsDiv>
          <Field>
            <label htmlFor="username">Nome de usuário:</label>
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

      <Btn>Entrar</Btn>
      </Form>
    </Main>
  );
}

export default Login;
