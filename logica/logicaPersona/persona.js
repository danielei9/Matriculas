
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarPersona() -->
    // .................................................................
    module.exports.insertarPersona = async function(datos) {
        var textoSQL = "insert into Persona values($dni, $nombre, $apellidos);"
        var valoresParaSQL = {
            $dni: datos.dni,
            $nombre: datos.nombre,
            $apellidos: datos.apellidos
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })            
        })
    } // ()
    // dni:Texto
    // -->
    // buscarPersonaPorDNI() <--
    // <--
    // {dni:Texto, nombre:Texto: apellidos:Texto}
    // .................................................................
    module.exports.buscarPersonaConDNI = function (dni) {
        var textoSQL = "select * from Persona where dni=$dni";
        var valoresParaSQL = {
            $dni: dni
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
     // 
    // -->
    // buscarPersonas() <--
    // <--
    // {dni:Texto, nombre:Texto: apellidos:Texto}
    // .................................................................
    module.exports.buscarPersonas = function () {
        var textoSQL = "select * from Persona ";
        var valoresParaSQL = {
          
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    module.exports.borrarPersona = function (dni) {
        var textoSQL = "DELETE from Persona where dni=$dni";
        var valoresParaSQL = {
            $dni: dni
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } 
    