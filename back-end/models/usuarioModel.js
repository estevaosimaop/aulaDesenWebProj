const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Função para obter todos os usuários
const getAllUsers = (callback) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const findUserById = (id_user, callback) => {
    const query = 'SELECT id, nome, email, data_criacao FROM usuarios WHERE id = ?';
    connection.query(query, [id_user], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result[0]);
        }
    });
}

const findUserByEmail = (email, callback) => {
    const query = 'SELECT id, nome, email, data_criacao , senha FROM usuarios WHERE email = ?';
    connection.query(query, [email], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result[0]);
        }
    });
}

const createUser = (nome, email, senha, callback) => {
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.insertId);
        }
    });
};

const createUser2 = (nome, email, senha, callback) => {
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(query, [nome, email, senha], (err, result) => {
        const newUserId = result.insertId;
            findUserById(newUserId, (err, user) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, user); // Retorna os dados completos do usuário criado
                }
            });
    });
};

// Função para deletar um usuário
const deleteUser = (id, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
};

module.exports = { getAllUsers, createUser, createUser2, findUserById, deleteUser, findUserByEmail};