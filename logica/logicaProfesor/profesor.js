
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarProfesor() -->
    //<-- {dni:Texto, cargaLectiva:int}
    // .................................................................
    module.exports.insertarProfesor = async function(datos) {
        var textoSQL = "insert into Profesor values($dni, $cargaLectiva);"
        var valoresParaSQL = {
            $dni: datos.dni,
            $cargaLectiva: datos.cargaLectiva           
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // dni:Texto
    // -->
    // buscarProfesorPorDNI() <--
    // <--
    // {dni:Texto, cargaLectiva:int}
    // .................................................................
    module.exports.buscarProfesorConDNI = function (dni) {
        var textoSQL = "select * from Profesor where dni=$dni";
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
     // dni:Texto, cargaLectiva:R
    // -->
    // updateCargaLectivaPorDni() <--
    // <--
    //{dni:Texto, cargaLectiva:int}
    // .................................................................
    module.exports.updateCargaLectivaPorDni = function (datos) { ////Update clientes Set nombre='José' Where nombre='Pepe'
        var textoSQL = "UPDATE Profesor Set cargaLectiva=$cargaLectiva where dni=$dni";
        var valoresParaSQL = {
            $dni: datos.dni,
            $cargaLectiva: datos.cargaLectiva
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // -->
    // buscarProfesores() <--
    // <--
    // {dni:Texto, nombre:Texto: apellidos:Texto}
    // .................................................................
    module.exports.buscarProfesores = function () {
        var textoSQL = "select * from Profesor ";
        var valoresParaSQL = {
          
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    