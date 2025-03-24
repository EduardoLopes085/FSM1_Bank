const express = require('express');
const app = express();

const {GetUsers, GetIdUsers, PostUsers, PutUsers, DeleteUsers} = require('./services/users')

const {GetGastos, GetIdGastos, GastosPorUser, PostGastos, DeleteGastos} = require('./services/gastos')

const {GetWallet, GetIdWallet} = require('./services/wallet')

const GetWalletUser = require('./services/walletUser')

const login = require('./services/login')

const authToken = require('./middlewares/auth');



PORT = 4000;
app.use(express.json());


//Login
app.get('/login', login)



//CRUD dos Users
app.get("/getusers", authToken , GetUsers )

app.get("/getuserbyid/:id", authToken , GetIdUsers)

app.post("/postuser", PostUsers)

app.put("/users/:id", authToken , PutUsers)

app.delete("/users/:id", authToken , DeleteUsers)


//CRUD dos gastos
app.get("/gastos", authToken , GetGastos)

app.get("/gastos/:id", authToken , GetIdGastos)

app.get('/gastosPorUser/:id', authToken , GastosPorUser )

app.post("/gastos", PostGastos)

app.delete("/gastos/:id", authToken , DeleteGastos)

//Wallet
app.get("/wallet", GetWallet)

app.get("/wallet/:id", GetIdWallet)


//WalletUsers
app.get("/walletUsers", GetWalletUser )




app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});