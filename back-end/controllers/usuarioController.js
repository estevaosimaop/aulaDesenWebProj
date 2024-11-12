const usuarioModel = require('../models/usuarioModel');

// Controlador para obter todos os usuários
const getAllUsers = (req, res) => {
    usuarioModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao recuperar os usuários', error: err });
        } else {
            res.status(200).json(users); // Retorna os usuários como JSON
        }
    });
};

// Controlador para criar um novo usuário
const createUser = (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    usuarioModel.createUser(nome, email, senha, (err, userId) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso', userId });
    });
};


module.exports = { getAllUsers, createUser };
