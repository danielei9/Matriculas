 // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................
    module.exports.borrarFilasDe = function (tabla) {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from " + tabla + ";",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................
    module.exports.borrarFilasDeTodasLasTablas = async function() {
        await this.borrarFilasDe("Imparte")
        await this.borrarFilasDe("Profesor")
        await this.borrarFilasDe("Matricula")
        await this.borrarFilasDe("Asignatura")
        await this.borrarFilasDe("Persona")
  
    } // ()
