
    // datos:{dni:TXT, codigo:Texto: }
    // -->
    // MatriculaPorDni() -->
    // .................................................................

    module.exports.impartePorDni = function (datos) {
        var textoSQL = "insert into imparte values ($dni, $codigo);"

        var valoresParaSQL = {
            $dni: datos.dni,
            $codigo: datos.codigo
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })/*    */
    } // ()
    
    // datos:{dni:TXT, codigo:Texto: }
    // -->
    // borrarImparte() -->
    // .................................................................
    module.exports.borrarImparte = function (dni,codigo) {
        var textoSQL = "delete from Imparte where dni=$dni AND codigo=$codigo;";
        var valoresParaSQL = {
            $dni: dni,
            $codigo: codigo,
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } 
    

// dni:Texto
    // -->
    // buscarMatriculaPorDni() <--
    // <--
    // {dni:Texto, codigo:Texto}
    // .................................................................
    module.exports.buscarCreditosPorDni = function (dni) {
        console.log(dni)
        console.log("buscarCreditosPorDNI")
        var textoSQL = "SELECT creditos FROM Asignatura AS asig INNER JOIN Imparte AS imp ON asig.codigo = imp.codigo WHERE imp.dni=$dni;";
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

        // dni:Texto
    // -->
    // buscarMatriculaPorDni() <--
    // <--
    // {dni:Texto, codigo:Texto}
    // .................................................................
    module.exports.buscarImpartePorDni = function (dni) {
        var textoSQL = "select * from imparte where dni=$dni";
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
        // -->
    // buscarImparte() <--
    // <--
    // {dni:Texto, codigo:Texto}
    // .................................................................
    module.exports.buscarImparte = function () {
        var textoSQL = "select * from Imparte";
        var valoresParaSQL = {
          
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    
     // ...