import React from 'react'
import './cardspent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function CardSpent(props) {
  const token = sessionStorage.getItem("token");

  // Função para deletar o gasto
  const deletar = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/gastos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviando o token no cabeçalho
        },
      });

      console.log("Despesa excluída com sucesso:", response.data);
      // Chama a função de deleção no componente pai para atualizar o estado
      props.onDelete(id);  // Atualiza a lista de despesas removendo o gasto deletado
    } catch (err) {
      console.error("Erro ao deletar despesa:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className='CardSpent'>
      <h1>{props.description}</h1>
      <p>Valor: ${props.value}</p>
      <p>Data: {props.date}</p>
      <p>Categoria: {props.category}</p>

      <span>
        <FontAwesomeIcon
          icon={faTrash}
          className='TrashIcon'
          onClick={() => deletar(props.id)}  // Passa o ID da despesa para deletar
        />
      </span>
    </div>
  )
}

export default CardSpent;
