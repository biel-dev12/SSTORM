import { Main, Form, Title, InputsDiv, Field, Btn, Option } from "./style";
import { Link } from "react-router-dom";
import DeptList from '../../components/DeptList'


function SignUp() {
  return (
    <Main>
      <Form action="">
        <Title>Criar conta</Title>

        <InputsDiv>
          <Field>
            <label htmlFor="fullname">Nome Completo:</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
            />
          </Field>
          <Field>
            <label htmlFor="dept">Seu Depto:</label>
            <DeptList />
          </Field>
          <Field>
            <label htmlFor="username">Nome de usuário (anote):</label>
            <input
              type="text"
              name="username"
              id="username"
              disabled
            />
          </Field>
          <Field>
            <label htmlFor="email">E-mail:</label>
            <input type="email" name="email" id="email" placeholder="gabriel@doctorspraigrande.com.br" />
          </Field>
          <Field>
          <label htmlFor="newPassw">Crie uma senha:</label>
          <input type="password" name="newPassw" id="newPassw" />
          </Field>
          <Field>
            <label htmlFor="cPassw">Confirme a senha:</label>
            <input type="password" name="cPassw" id="cPassw" />
          </Field>
        </InputsDiv>

      <Btn type="submit">Entrar</Btn>

      <Option>Jà tem uma conta?<Link to="/login"><span>Entrar!</span></Link></Option>
      </Form>
    </Main>
  );
}

export default SignUp;
