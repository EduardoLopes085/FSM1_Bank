import React, { useEffect, useState } from "react";
import axios from "axios";  // Importando o axios
import CardSpent from '../CardSpent';
import './allSpents.css';

function AllSpents() {
  const [spents, setSpents] = useState([]);

  // Acessando o token e userId do sessionStorage
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    // Verificando se o token e userId estão disponíveis
    if (!token || !userId) {
      console.error("Token ou userId não encontrado no sessionStorage.");
      return;
    }

    // Usando axios para fazer a requisição
    const fetchSpents = async () => {
      try {
        const carteiraResponse = await axios.get(`http://localhost:4000/wallet/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Passando o token no header
          },
        });

        // Acessando o campo 'expenses' da resposta
        const expensesData = carteiraResponse.data.expenses;
        setSpents(expensesData);  // Armazenando apenas os dados de 'expenses'
      } catch (err) {
        console.error("Erro ao buscar despesas:", err);
      }
    };

    fetchSpents();
  }, [token, userId]);  // Adicionando dependências ao useEffect

  // Função para deletar a despesa no estado
  const handleDelete = (id) => {
  setSpents((prevSpents) => prevSpents.filter((spent) => spent.id !== id));
};

  return (
    <div className="SpentList">
      {spents.map((spent) => (
        // Passando a função onDelete para o CardSpent
        <CardSpent
          key={spent.id}
          description={spent.descricao}
          value={spent.value}
          date={spent.date}
          category={spent.category}
          id={spent.id}
          onDelete={handleDelete}  // Passando a função de deleção
        />
      ))}
    </div>
  );
}

export default AllSpents;
