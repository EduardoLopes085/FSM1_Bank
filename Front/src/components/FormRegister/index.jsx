import { useForm } from "react-hook-form";
import axios from "axios";
import "./FormRegister.css";
import Logo from "/coin.png";

function FormRegister() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/postuser", data);
      console.log("Usuário cadastrado:", response.data);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
      alert(`Erro ao cadastrar usuário: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div id="divCadastro">
      <img className="Logo" src={Logo} alt="Logo" />
      <form id="formCadastro" onSubmit={handleSubmit(onSubmit)}>
        <h1>Crie uma Conta</h1>

        <input
          className="input"
          type="text"
          placeholder="Digite seu nome"
          {...register("name", { required: "O nome é obrigatório" })}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <input
          className="input"
          type="email"
          placeholder="Digite seu email"
          {...register("email", { required: "O email é obrigatório" })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          className="input"
          type="password"
          placeholder="Digite sua senha"
          {...register("password", { required: "A senha é obrigatória" })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button id="buttonRegister" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default FormRegister;
