import React, { useState } from 'react';
import './addSpent.css';

function AddSpent() {
  const [formData, setFormData] = useState({
    description: '',
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

    // Verifica se todos os campos estão preenchidos
    if (!formData.description || !formData.value || !formData.date || !formData.category) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/spent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Despesa adicionada com sucesso!");
        setFormData({ description: '', value: '', date: '', category: '' }); // Limpa o formulário
      } else {
        alert("Erro ao adicionar despesa.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className='Spent'>
      <form className='SpentContainer' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Descrição' 
          name="description" 
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

        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        />

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
