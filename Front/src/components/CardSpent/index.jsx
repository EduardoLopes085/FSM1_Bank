import React from 'react'
import './cardspent.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'

function CardSpent(props) {
  
  function deletar(id) {
    fetch(`http://localhost:3000/spent/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
    .then(res => {
        console.log(res);
    });
  } 
  
  
  
  return (
    <div className='CardSpent'>
        <h1>{props.description}</h1>
        <p>Valor: ${props.value}</p>
        <p>Data: {props.date} </p>
        <p>Categoria: {props.category}</p>

        <span> 
          <FontAwesomeIcon icon={faTrash}  className='TrashIcon' onClick={() => deletar(props.id)}/>
        </span>
    </div>
  )
}

export default CardSpent
