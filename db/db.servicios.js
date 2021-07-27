//Importo los modulos necesarios
const Usuarios = require('./db.modelos')

//Exporto los modulos

module.exports.usuarios = async ()=>{
    try {
        let resultado = await Usuarios.findAll()
        return resultado[0]
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}