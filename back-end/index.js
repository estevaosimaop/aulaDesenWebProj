const express = require('express');
const cors = require('cors');
const usuarioController = require('./controllers/usuarioController');
const authMiddleware = require('./middlewares/authMiddleware');

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

app.post('/api/register', usuarioController.register);

app.post('/api/login', usuarioController.login);


app.get('/rota-protegida', authMiddleware, (req, res) => {
    res.send('Acesso concedido à rota protegida');
});

// app.post('/api/delete', usuarioController.delete);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
