const express = require('express');
const app = express();

const {GetUsers, GetIdUsers, PostUsers, PutUsers, DeleteUsers} = require('./services/users')

const {GetGastos, GetIdGastos, GastosPorUser, PostGastos, DeleteGastos} = require('./services/gastos')



PORT = 4000;
app.use(express.json());



//CRUD dos Users
app.get("/users", GetUsers )

app.get("/users/:id", GetIdUsers)

app.post("/users", PostUsers)

app.put("/users/:id", PutUsers)

app.delete("/users/:id", DeleteUsers)


//CRUD dos gastos
app.get("/gastos", GetGastos)

app.get("/gastos/:id", GetIdGastos)

app.get('/gastosPorUser/:id', GastosPorUser )

app.post("/gastos", PostGastos)

app.delete("/gastos/:id", DeleteGastos)






app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});