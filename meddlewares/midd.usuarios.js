//IMPORTO LOS MODULOS NECESARIOS
const cors = require('cors')
const rateLimit = require("express-rate-limit");

//EXPORTO MODULOS DE SERVICIO
module.exports.corsOption = {
    origin : function (origin, callback) {
        if (process.env.listaBlanca.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('No autorizado por Cors'))
        }
    }
}

module.exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: 'Usted exedió el limite de accesos a la API'
  });