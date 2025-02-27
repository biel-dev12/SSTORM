import { Main, Form, Title, InputsDiv, Field, Btn, Option } from "./style";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DeptList from "../../components/Responses/DeptList";
import { toast } from "react-toastify";
import { registerUser } from "../../api/userService.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    dept: "",
    email: "",
    username: "",
    newPassw: "",
    cPassw: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const [firstName, lastName] = formData.fullname.split(" ");

    if (firstName && lastName && formData.dept) {
      const username = `${
        firstName.toLocaleLowerCase() + lastName[0].toUpperCase()
      }_${formData.dept}`;
      setFormData((prev) => ({ ...prev, username }));
    }
  }, [formData.fullname, formData.dept]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeptChange = (dept) => {
    setFormData((prev) => ({ ...prev, dept }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassw !== formData.cPassw) {
      toast.error("As senhas não coincidem");
      setLoading(false);
      return;
    }

    console.log(formData);
    try {
      await registerUser(formData);
      toast.success("Cadastro realizado com sucesso!", { autoClose: 1000 });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Erro ao cadastrar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <Title>Criar conta</Title>

        <InputsDiv>
          <Field>
            <label htmlFor="fullname">Nome Completo:</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <label htmlFor="dept">Seu Depto:</label>
            <DeptList
              selectedDept={formData.dept}
              onDeptChange={handleDeptChange}
            />
          </Field>
          <Field>
            <label htmlFor="username">Nome de usuário (anote):</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              disabled
            />
          </Field>
          <Field>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="gabriel@doctorspraigrande.com.br"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <label htmlFor="newPassw">Crie uma senha:</label>
            <input
              type="password"
              name="newPassw"
              id="newPassw"
              value={formData.newPassw}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <label htmlFor="cPassw">Confirme a senha:</label>
            <input
              type="password"
              name="cPassw"
              id="cPassw"
              value={formData.cPassw}
              onChange={handleChange}
              required
            />
          </Field>
        </InputsDiv>

        <Btn type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Btn>

        <Option>
          Jà tem uma conta?
          <Link to="/login">
            <span>Entrar!</span>
          </Link>
        </Option>
      </Form>
    </Main>
  );
}

export default SignUp;
