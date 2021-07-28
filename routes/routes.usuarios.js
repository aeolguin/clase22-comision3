//Importo los modulos necesarios
const midd = require('../meddlewares/midd.usuarios')
const servicesUsuarios = require('../services/services.usuarios')
const cors = require('cors')

//Exportamos nuestros modulos

module.exports = async (app)=> {
    app.post('/nuevousuario', async (req,res)=>{
        let usuario = req.body
        try{

            let resultado = servicesUsuarios.crearUsuarios(usuario)
            res.status(200).json('Usuario creado correctamente')
            //res.json(resultado)

        }catch(err){
            console.log(err)
            res.status(400).send('Ocurrio un error inesperado')  
        }
    })

    app.post('/login', async (req,res)=>{
        let usuario = req.body
        console.log(usuario)
        try {
            let resultado = await servicesUsuarios.chequearUsrValido(usuario)
            if (resultado) {
                let validacion = await servicesUsuarios.generaToken(usuario)
                res.json(validacion)
            }
        }catch (err){
            console.log(err)
            res.status(400).send('Usuario no registrado')
        }
    })

    app.get('/usuarios' ,midd.usuarioValido, (req,res)=>{
        try {
            res.status(200).json('Se verifico el jwt')
        }catch(error) {
            console.log(error)
            res.status(400).send('algo raro paso')
        }
    })

}