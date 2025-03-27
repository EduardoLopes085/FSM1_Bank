import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shareWalletForm.css';

function ShareWalletForm() {
  const [wallets, setWallets] = useState([]);
  const [users, setUsers] = useState([]);
  const [walletId, setWalletId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const token = sessionStorage.getItem('token');
  const currentUserId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar carteiras do usuário logado
        const walletRes = await axios.get(`http://localhost:4000/wallet/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWallets([walletRes.data]);

        // Buscar todos os usuários (exceto o atual)
        const userRes = await axios.get(`http://localhost:4000/getusers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const otherUsers = userRes.data.filter(user => user.id !== parseInt(currentUserId));
        setUsers(otherUsers);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setMessage('Erro ao carregar carteiras ou usuários.');
      }
    };

    fetchData();
  }, [token, currentUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletId || !userId) {
      setMessage('Selecione uma carteira e um usuário.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/wallet/share',
        { walletId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      setWalletId('');
      setUserId('');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erro ao compartilhar carteira.';
      console.error(err);
      setMessage(errorMsg);
    }
  };

  return (
    <div className="share-wallet-form">
      <h2>Compartilhar Carteira</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Selecione uma Carteira:
          <select value={walletId} onChange={(e) => setWalletId(e.target.value)}>
            <option value="">-- Escolha uma carteira --</option>
            {wallets.map(wallet => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name || `Carteira #${wallet.id}`}
              </option>
            ))}
          </select>
        </label>

        <label>
          Compartilhar com:
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">-- Escolha um usuário --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name || `Usuário #${user.id}`}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Compartilhar</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ShareWalletForm;
