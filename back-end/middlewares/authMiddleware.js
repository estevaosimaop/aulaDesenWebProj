const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
    let req_st = req.header('Authorization');
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(req_st) 
    if (!token) { 
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido.' });
    }
}

module.exports = authMiddleware;