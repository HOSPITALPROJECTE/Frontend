const express = require('express');
const app = express();
const connection = require('./connexio.js');// IMPORTA L'ARXIU DE LA CONNEXIÓ A LA BASE DE DADES

/* Permet totes les peticions*/
const cors = require('cors');
app.use(cors());
/* Permet totes les peticions*/

app.get('/', (req, res) => {
    res.send('Hola, bienvenido a mi API');
});

app.get('/', (req, res) => {
    res.send(connection);
});


app.get('/', (req, res) => {
    console.log(connection)
    connection.query('select noms from usuaris', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(9090, () => {
    console.log('La API está escuchando en el puerto 3000');
});

app.post('/login', (req, res) => {
    let noms = req.body.noms;
    let contrasenyes = req.body.contrasenyes;
 
    let query = "select noms from usuaris where usuari=? AND contrasenyes=? ";
    connection.query(query, [noms, contrasenyes], (err, result) => {
       if(err) {
          res.json({
             status: "error",
             message: err
          });
       }
       else {
          res.json({
             status: "success",
             data: result
          });
       }
    });
 });
