    // -->
    // buscarAsignaturas() <--
    // <--
    // {dni:Texto, codigo:Texto: curso:R , nota:R}
    // .................................................................
    module.exports.buscarAsignaturas = function () {
        var textoSQL = "select * from Asignatura ";
        var valoresParaSQL = {
          
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    
     // .................................................................
    // datos:{codigo:TXT, nombre:Texto: grado:Texto}
    // -->
    // insertarAsignatura() -->
    // .................................................................

    module.exports.insertarAsignatura = function(datos) {
        var textoSQL = "insert into Asignatura values ($codigo, $nombre, $grado, $creditos);"

        var valoresParaSQL = {
            $codigo: datos.codigo,
            $nombre: datos.nombre,
            $grado: datos.grado,
            $creditos: datos.creditos,
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
        // codigo:Texto
    // -->
    // buscarAsignaturaconCodigo() <--
    // <--
    // {codigo:Texto, nombre:Texto: grado:Texto}
    // .................................................................
    module.exports.buscarAsignaturaPorCodigo = function (codigo) {
        var textoSQL = "select * from Asignatura where codigo=$codigo";
        var valoresParaSQL = {
            $codigo: codigo
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
       // APELLIDO:Texto
    // -->
    // asignaturasPorApellido() <--
    // <--
    // {codigo:Texto, nombre:Texto:, grado:texto }
    // .................................................................
    
    module.exports.asignaturasPorApellido = function (apellidos){
        var textoSQL = "select Asignatura.codigo from Asignatura,Persona where Persona.apellidos= $apellidos;"
         var valoresParaSQL = {
             $apellidos: apellidos
         }
                return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    }
            // dni:Texto

            module.exports.updateNombrePorCodigo = function (datos) {
                var textoSQL = "UPDATE Asignatura Set nombre=$nombre where codigo=$codigo";
                var valoresParaSQL = {
                    $nombre: datos.nombre,
                    $codigo: datos.codigo
                }
                return new Promise((resolver, rechazar) => {
                    this.laConexion.run(textoSQL, valoresParaSQL,
                        (err, res) => {
                            (err ? rechazar(err) : resolver(res))
                        })
                })
            } // ()
    