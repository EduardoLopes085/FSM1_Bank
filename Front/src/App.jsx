import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RegisterPages from './page/RegisterPages';
import Home from './page/Home';
import SpentForm from './page/SpentForm';
import SpentList from './page/SpentList';
import ChartsPage from './page/ChartsPage';
import walletSpent from './page/walletSpent'; 
import AllWallets from './components/allWallets';
import AllSpents from './components/allSpents';
import ShareWallet from './page/ShareWallet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPages />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addspent" element={<SpentForm />} />
        <Route path="/spentList" element={<SpentList />} />
        <Route path="/ChartsPage" element={<ChartsPage />} />
        <Route path="/allspents/:walletId" element={<walletSpent />} /> {/* Rota para mostrar as despesas de uma carteira */}
        <Route path="/wallets" element={<AllWallets />} />
        <Route path="/wallet/:walletId/spents" element={<ShareWallet />} />
      </Routes>
    </Router>
  );
}

export default App;
