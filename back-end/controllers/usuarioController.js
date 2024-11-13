const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
// const usuarioModel = require('../models/usuarioModel');
const User = require('../models/usuarioModel'); // Assumindo um modelo de usuário

// Função para gerar token
function gerarToken(user) {
    console.log(user);
    return jwt.sign({ id: user.id, nome: user.nome, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });    
}

// Registro de Ususpario
const register = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    // Cria o usuário no banco
    User.createUser2(nome, email, hashedPassword, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
        }
        //res.status(201).json({ message: 'Usuário criado com sucesso', userId });
        const token = gerarToken(user);
        res.json({ token });
    });

    
};


// Login
const login = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findUserByEmail(email, (err, users) => {
        if(err){
            return res.status(400).json({ error: 'Credenciais inválidas' });
        }else { 
                        
            if (!users || !(bcrypt.compareSync(senha, users.senha))) {
                
                console.log("Erro...");
                return res.status(400).json({ error: 'Credenciais inválidas' });
            }else{
                const token = gerarToken(users);                
                console.log("OK...")
                return res.json({ token });
            }
            
        }
    });

};



// Controlador para obter todos os usuários
const getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
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

    User.createUser(nome, email, senha, (err, userId) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso', userId });
    });
};


module.exports = { getAllUsers, createUser, register, login};
