import React, { useEffect, useState } from "react";
import axios from "axios";  // Importando o axios
import CardWallet from '../cardWallet'; // Usando o CardWallet
import './allWallets.css';

function AllWallets() {
  const [sharedWallets, setSharedWallets] = useState([]);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId"); // Obtendo o userId do sessionStorage

  useEffect(() => {
    // Verificando se o token e userId estão disponíveis
    if (!token || !userId) {
      console.error("Token ou userId não encontrado no sessionStorage.");
      return;
    }

    // Usando axios para fazer a requisição
    const fetchSharedWallets = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getusers", {
          headers: {
            Authorization: `Bearer ${token}`,  // Passando o token no header
          },
        });

        // Filtrando as carteiras compartilhadas com o usuário logado
        const wallets = response.data.reduce((acc, user) => {
          if (user.id === parseInt(userId)) {
            // Filtrando as carteiras compartilhadas que correspondem ao userId
            return [...acc, ...user.sharedWallets];
          }
          return acc;
        }, []);

        setSharedWallets(wallets);  // Armazenando as carteiras compartilhadas
      } catch (err) {
        console.error("Erro ao buscar as carteiras compartilhadas:", err);
      }
    };

    fetchSharedWallets();
  }, [token, userId]);

  return (
    <>
      <div className="allWalletsHeader">
        <h1>Carteiras compartilhadas</h1>
      </div>
      <div className="SpentList">
        {sharedWallets.length > 0 ? (
          sharedWallets.map((wallet) => (
            <CardWallet
              key={wallet.id}
              id={wallet.id} // Passando ID da carteira
              walletId={wallet.walletId} // Passando o walletId da carteira
              userId={wallet.userId} // Passando o userId do usuário que compartilhou
            />
          ))
        ) : (
          <p>Carregando carteiras compartilhadas...</p>
        )}
    </div>
    
    </>
    
    
  );
}

export default AllWallets;
