import React from 'react'
import { useEffect, useState } from "react";
import CardSpent from '../CardSpent';
import './allSpents.css'

function AllSpents() {
  
  const [spents, setSpents] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/spent")
      .then((res) => res.json())
      .then((data) => setSpents(data))
      .catch((err) => console.error("Erro ao buscar despesas:", err));
  }, []);
  
  return (
    <div className='SpentList'>
      {spents.map((spent) => (<CardSpent key={spent.id} description={spent.description} value={spent.value} date = {spent.date} category = {spent.category} id={spent.id} />))}
    </div>
  )
}

export default AllSpents
