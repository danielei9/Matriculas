/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           Logica.js
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
// .....................................................................
// mainServidorREST.js
// .....................................................................
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const Logica = require('./logica/Logica.js')
// .....................................................................
// .....................................................................
function cargarLogica( fichero ) {
    return new Promise( (resolver, rechazar) => {
        var laLogica = new Logica( fichero,
            function( err ) {
                if ( err ) {
                    rechazar( err )
                } else {
                    resolver( laLogica )
                }
            }) // new
    }) // Promise
} // ()
process.on('uncaughtException', function (err) {
    console.log(err);
}); 
// .....................................................................
// main()
// .....................................................................
function main() {
    
    cargarLogica('./bd/datos.bd')
    // creo el servidor
    var servidorExpress = express();
    // para poder acceder a la carga de la petición http, asumiendo que es JSON
    servidorExpress.use(bodyParser.text({type: "application/json"}));
    // cargo las reglas REST
    var reglas = require("./ReglasREST.js") ; 
    reglas.cargar(servidorExpress);
    // arrancao el servidor
    var servicio = servidorExpress.listen(63255, function () {
        console.log("servidor REST escuchando en el puerto 63255 ")
    }) ;
    //Take it easy with scripts bro
    servidorExpress.use('/fakeLogica', express.static(__dirname + '/fakeLogica'));
    // capturo control-c para cerrar el servicio ordenadamente
    process.on("SIGINT", function () {
        console.log("terminando");
        servicio.close()
    })
} // ()
// .....................................................................
// .....................................................................
main()
// .....................................................................
// .....................................................................
