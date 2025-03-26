import React from "react";
import './CardWallet.css';
import { useNavigate } from "react-router-dom";

function CardWallet({ id, walletId, userId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/wallet/${walletId}/spents`); // Rota dinâmica para a carteira
  };


  return (
    <div className="CardSpent" onClick={handleClick}>
      <h2>Carteira Compartilhada</h2>
      <p><strong>ID da Carteira:</strong> {walletId}</p>
      <p><strong>ID do Usuário:</strong> {userId}</p>
      {/* Você pode adicionar mais informações conforme necessário, como nome da carteira ou outros detalhes */}
    </div>
  );
}

export default CardWallet;
