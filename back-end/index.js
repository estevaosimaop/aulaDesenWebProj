const express = require('express');
const cors = require('cors');
const usuarioController = require('./controllers/usuarioController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir requisições de origens externas
app.use(cors());

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota para obter todos os usuários
app.get('/api/usuarios', usuarioController.getAllUsers);

app.post('/api/usuarios', usuarioController.createUser);

app.get('/', (req, res) => {
    res.send('Teste');
})



// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
