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
    res.send('<h1>Título<\h1>');
})

app.post('/api/register', authMiddleware, usuarioController.register);

app.post('/api/login', usuarioController.login);


app.get('/rotaprotegida', authMiddleware, (req, res) => {
    
    res.json({user: req.user});
});

// app.post('/api/delete', usuarioController.delete);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
