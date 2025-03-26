const express = require('express');
const cors = require('cors'); // Importe o pacote CORS
const app = express();

// Outras importações
const {GetUsers, GetIdUsers, PostUsers, PutUsers, DeleteUsers} = require('./services/users');
const {GetGastos, GetIdGastos, GastosPorUser, PostGastos, DeleteGastos} = require('./services/gastos');
const {GetWallet, GetIdWallet} = require('./services/wallet');
const {GetWalletUser, shareWallet } = require('./services/walletUser');
const login = require('./services/login');
const authToken = require('./middlewares/auth');

// Porta
PORT = 4000;
app.use(express.json());

// Habilite o CORS
app.use(cors()); // Isso vai permitir que qualquer origem faça requisições para o seu backend

// Login
app.post('/login', login);

// CRUD dos Users
app.get("/getusers", GetUsers );
app.get("/getuserbyid/:id", authToken , GetIdUsers);
app.post("/postuser", PostUsers);
app.put("/users/:id", authToken , PutUsers);
app.delete("/users/:id", authToken , DeleteUsers);

// CRUD dos gastos
app.get("/gastos", authToken , GetGastos);
app.get("/gastos/:id", authToken , GetIdGastos);
app.get('/gastosPorUser/:id', authToken , GastosPorUser );
app.post("/gastos", PostGastos);
app.delete("/gastos/:id", DeleteGastos);

// Wallet
app.get("/wallet", GetWallet);
app.get("/wallet/:id", GetIdWallet);

// WalletUsers
app.get("/walletUsers", GetWalletUser);

 
// Rota para compartilhar a carteira com um usuário
app.post("/wallet/share", shareWallet);


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
