const express = require('express');
const app = express();

PORT = 4000;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('servidor tá funfando');
});

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});