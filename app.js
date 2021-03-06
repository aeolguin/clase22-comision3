//Importamos los modulos requeridos
var express = require('express');
var app = express();
require('dotenv').config()
const sequelize = require('./db/db.conexion');
const cors = require('cors')
const usuariosRoutes = require('./routes/routes.usuarios')
const midd = require('./meddlewares/midd.usuarios')
const Usuarios = require('./db/db.modelos')

//Middlewares globales
app.use(express.json())
app.use(cors())
app.use(midd.limiter);

//iniciamos nuestro servidor
async function inicioServer() {
    try {
        //sincronizo la DB con el servidor
        await Usuarios.sync({alter:true})
        await sequelize.authenticate();
        console.log('Conección con la DB estabilizada correctamente');
        app.listen(process.env.PORT, function () {
            console.log(`Sistema iniciado en htt://${process.env.HOST}:${process.env.PORT}`);
        });
      } catch (error) {
        console.error('No se pudo conectar correctamebte con la Base de datos:', error);
      }
}

inicioServer();

//Routes
usuariosRoutes(app)