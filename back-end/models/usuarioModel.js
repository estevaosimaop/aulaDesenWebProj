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

module.exports = { getAllUsers, createUser };