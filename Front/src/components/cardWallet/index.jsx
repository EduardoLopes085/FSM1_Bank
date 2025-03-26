import React from "react";
import './CardWallet.css';

function CardWallet({ id, walletId, userId }) {
  return (
    <div className="CardSpent">
      <h2>Carteira Compartilhada</h2>
      <p><strong>ID da Carteira:</strong> {walletId}</p>
      <p><strong>ID do Usuário:</strong> {userId}</p>
      {/* Você pode adicionar mais informações conforme necessário, como nome da carteira ou outros detalhes */}
    </div>
  );
}

export default CardWallet;
