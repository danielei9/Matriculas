    // datos:{dni:TXT, codigo:Texto: }
    // -->
    // MatriculaPorDni() -->
    // .................................................................

    module.exports.MatriculaPorDni = function (datos) {
        
        var textoSQL = "insert into Matricula values ($dni, $codigo, $nota, $curso);"

        var valoresParaSQL = {
            $dni: datos.dni,
            $codigo: datos.codigo,
            $nota: datos.nota,
            $curso: datos.curso
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
        // dni:Texto
    // -->
    // buscarMatriculaPorDni() <--
    // <--
    // {dni:Texto, codigo:Texto}
    // .................................................................
    module.exports.buscarMatriculaPorDni = function (dni) {
        var textoSQL = "select * from Matricula where dni=$dni";
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
    module.exports.buscarMatriculaPorCursoAsignatura = function (datos) {
        var textoSQL = " SELECT Persona.nombre,Persona.dni,matricula.codigo,matricula.nota,matricula.dni,matricula.curso FROM Persona,Matricula WHERE matricula.curso=$curso AND matricula.codigo=$codigo AND Persona.dni=Matricula.dni";
        var valoresParaSQL = {
            $codigo: datos.codigo,
            $curso: datos.curso           
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    module.exports.updateNotaPorDniCodigo = function (dni,codigo,nota) { ////Update clientes Set nombre='José' Where nombre='Pepe'
        var textoSQL = "UPDATE Matricula Set nota=$nota where dni=$dni AND codigo=$codigo";
        var valoresParaSQL = {
            $dni: dni,
            $codigo: codigo,
            $nota: nota
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()

    module.exports.buscarNotaPorDniCodigo = function (dni,codigo) { 
        var textoSQL = "SELECT nota from MATRICULA where dni=$dni AND codigo=$codigo";
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
    } // 
    
    module.exports.desmatricular = function (dni,codigo) {
        var textoSQL = "DELETE FROM Matricula WHERE dni=$dni AND codigo=$codigo";
        var valoresParaSQL = {
            $dni: dni,
            $codigo: codigo
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    }// 
    // -->
    // buscarMatriculas() <--
    // <--
    // {dni:Texto, codigo:Texto: curso:R , nota:R}
    // .................................................................
    module.exports.buscarMatriculas = function () {
        var textoSQL = "select * from Matricula ";
        var valoresParaSQL = {
          
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    
    
    