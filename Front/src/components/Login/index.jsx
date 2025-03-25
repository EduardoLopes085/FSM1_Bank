import { useState } from "react";
import axios from "axios";
import "../Login/login.css";
import Logo from "/coin.png";
import { useNavigate } from "react-router-dom"; 

function Login() {
  
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate(); 

  // Função chamada quando o formulário for enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    try {
      
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      // Se o login for bem-sucedido, o token será retornado
      const token = response.data.token;

      // Armazena o token no localStorage para autenticação em futuras requisições
      localStorage.setItem("token", token);

      // Alerta de sucesso
      alert("Login bem-sucedido!");

      
      navigate('/home');
    } catch (error) {
     
      setErrorMessage(
        error.response?.data.message || `Erro ao fazer login: ${error.message}`
      );
    }
  };

  return (
    <div id="divLogin">
      <img className="imgLogin" src={Logo} alt="Logo" />
      <form id="formLogin" onSubmit={handleSubmit}>
        <h1>Login</h1>

       
        <input
          className="inputLogin"
          type="email"
          name="email"
          placeholder="Usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
        />

      
        <input
          className="inputLogin"
          type="password"
          name="senha"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />

       
        <button id="botaoLogin" type="submit">
          Entrar
        </button>
      </form>

      <p id="paragrafo">Ainda não possui conta? <a id="link" href="/register">Cadastre-se</a></p>

     
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Login;
