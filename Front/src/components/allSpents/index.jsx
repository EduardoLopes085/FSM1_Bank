import React, { useEffect, useState } from "react";
import axios from "axios";
import CardSpent from '../CardSpent';
import { useParams } from "react-router-dom";
import './allSpents.css';

function AllSpents() {
  const [spents, setSpents] = useState([]);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId"); // Mantido conforme solicitado
  const { walletId } = useParams(); // Pegando o ID da carteira pela URL

  useEffect(() => {
    if (!token || !walletId) {
      console.error("Token ou walletId não encontrado.");
      return;
    }

    const fetchSpents = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/wallet/${walletId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Aqui você pode filtrar os gastos pelo userId, se quiser
        // Exemplo:
        // const userSpents = response.data.expenses.filter(spent => spent.userId === parseInt(userId));
        // setSpents(userSpents);

        // Ou simplesmente pegar todos os gastos da carteira
        setSpents(response.data.expenses);
      } catch (err) {
        console.error("Erro ao buscar despesas:", err);
      }
    };

    fetchSpents();
  }, [token, walletId]);

  const handleDelete = (id) => {
    setSpents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="SpentList">
      {spents.map((spent) => (
        <CardSpent
          key={spent.id}
          description={spent.descricao}
          value={spent.value}
          date={spent.date}
          category={spent.category}
          id={spent.id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default AllSpents;
