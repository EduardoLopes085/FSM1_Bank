const express = require('express');
const app = express();

const {GetUsers, GetIdUsers, PostUsers, PutUsers, DeleteUsers} = require('./users')



PORT = 4000;
app.use(express.json());

//CRUD dos Users
app.get("/users", GetUsers )

app.get("/users/:id", GetIdUsers)

app.post("/users", PostUsers)

app.put("/users/:id", PutUsers)

app.delete("/users/:id", DeleteUsers)








app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});