const jwt =require('jsonwebtoken');

const token=jwt.sign({noms, contrasenyes}, 'secretKey');
token=res.token;

