const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());  

app.use(express.json());  

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'futbol'
});

app.get("/jugadores", (req, res) => {
    db.query('SELECT * FROM jugadores', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener los jugadores');
        }
        res.status(200).json(results);  
    });
});

app.post("/inscribir_jugador", (req, res) => {
    const { nombre, apellido, dni, telefono, direccion, edad, categoria, id_equipo } = req.body;
    const equipo_id = parseInt(req.body.equipo_id);
    db.query(
        'INSERT INTO jugadores (nombre, apellido, dni, telefono, direccion, edad, categoria, id_equipo) VALUES (?,?,?,?,?,?,?,?)',
        [nombre, apellido, dni, telefono, direccion, edad, categoria, id_equipo],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error en la base de datos');
            }
            res.status(200).send('Jugador inscrito correctamente');
        }
    );
});

app.post("/inscribir_equipo", (req, res) => {
    const {nombre, director, id_torneo} = req.body;
    const torneo_id = parseInt(req.body.equipo_id);
    db.query(
        'INSERT INTO equipos (nombre, director, id_torneo) VALUES (?,?,?)',
        [nombre, director, id_torneo],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error en la base de datos');
            }
            res.status(200).send('Equipo inscrito correctamente');
        }
    );
})

app.get("/equipos", (req, res) => {
    db.query('SELECT * FROM equipos', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener los equipos');
        }
        res.status(200).json(results);  
    });
});

app.post("/crear_torneo", (req, res) => {
    const {nombre, categoria, division} = req.body;
    db.query(
        'INSERT INTO torneos (nombre, categoria, division) VALUES (?,?,?)',
        [nombre, categoria, division],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error en la base de datos');
            }
            res.status(200).send('Torneo inscrito correctamente');
        }
    );
})

app.get("/torneos", (req, res) => {
    db.query('SELECT * FROM torneos', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener los equipos');
        }
        res.status(200).json(results);  
    });
});




app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

