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
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
  
      const token = response.data.token;
      const userId = response.data.user.id;
  
      // Salvar token e userId
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);
  
      // Buscar a carteira do usuário
      const carteiraResponse = await axios.get(`http://localhost:4000/wallet/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const carteira = carteiraResponse.data;
  
      if (carteira && carteira.id) {
        sessionStorage.setItem("walletId", carteira.id);
        console.log("Carteira encontrada! walletId salvo:", carteira.id);
      } else {
        alert("Carteira não encontrada.");
      }
  
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