import React, { useState } from 'react';
import axios from "axios";
import './addSpent.css';

function AddSpent() {
  const token = sessionStorage.getItem("token");
  const walletId = sessionStorage.getItem("walletId"); // Supondo que você armazene o walletId aqui
  
  const [formData, setFormData] = useState({
    descricao: '',
    value: '',
    date: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.descricao || !formData.value  || !formData.category) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/gastos", {
        ...formData,
        walletId // Envia o walletId junto
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Remova se não estiver usando JWT
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert("Despesa adicionada com sucesso!");
        setFormData({ descricao: '', value: '', date: '', category: '' });
      } else {
        alert("Erro ao adicionar despesa.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error.response?.data || error.message);
      alert("Erro ao enviar os dados. Veja o console para detalhes.");
    }
  };

  return (
    <div className='Spent'>
      <form className='SpentContainer' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Descrição' 
          name="descricao" 
          value={formData.descricao} 
          onChange={handleChange} 
        />

        <input 
          type="text" 
          placeholder='Valor' 
          name="value" 
          value={formData.value} 
          onChange={handleChange} 
        />

        {/* <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        /> */}

        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
        >
          <option value="" disabled>Escolha uma opção</option>
          <option value="alimentacao">Alimentação</option>
          <option value="fixo">Fixo</option>
          <option value="imprevisto">Imprevisto</option>
          <option value="lazer">Lazer</option>
          <option value="outro">Outro</option>
        </select>

        <button className='SubmitButton' type="submit">Adicionar Gasto</button>
      </form>
    </div>
  );
}

export default AddSpent;
