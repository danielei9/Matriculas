/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           Logica.js
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */ //.....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
const delet = require("./logicaDelete/delete.js")
const persona = require("./logicaPersona/persona.js")
const matricula = require("./logicaMatricula/matricula.js")
const asignatura = require("./logicaAsignatura/asignatura.js")
const profesor = require("./logicaProfesor/profesor.js")
const imparte = require("./logicaImparte/imparte.js")



// .....................................................................
// .....................................................................
module.exports = class Logica {
    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor(nombreBD, cb) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            (err) => {
                if (!err) {
                    this.laConexion.run("PRAGMA foreign_keys = ON")
                }
                cb(err)
            })
    } // ()
    
    // .................................................................
    // cerrar() -->
    // .................................................................

    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.close((err) => {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    
     // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................
    borrarFilasDe = delet.borrarFilasDe
    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................
    borrarFilasDeTodasLasTablas = delet.borrarFilasDeTodasLasTablas
   
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarPersona() -->
    // .................................................................
      
    insertarPersona = persona.insertarPersona
     // .................................................................
    // datos:{dni:Texto}
    // -->
    // borrarPersona() -->
    // .................................................................
    borrarPersona = persona.borrarPersona

    // .................................................................
    // 
    // -->
    // buscarProfesores() <--datos:{dni:Texto, nombre:Texto: apellidos:Texto}
     // ................................................................
     buscarProfesores = profesor.buscarProfesores
        // .................................................................
    // 
    // -->
    // buscarMatriculas() <--datos:{dni:Texto, codigo:Texto  curso:r nota:r}
     // ................................................................
     buscarMatriculas = matricula.buscarMatriculas
      // 
    // -->
    // buscarMatriculas() 
    //<--datos:{codigo:Texto, nombre:Texto  grado:txt creditos:txt}
     // ................................................................
     buscarAsignaturas = asignatura.buscarAsignaturas
           // 
    // -->dni:Txt
    // buscarCreditosPorDni() 
        //<--datos:{R:Creditos }
     // ................................................................
     buscarCreditosPorDni = imparte.buscarCreditosPorDni
      // -->
    // buscarImparte() <--datos:{codigo:Texto, nombre:Texto  }
     // ................................................................
     buscarImparte = imparte.buscarImparte
    // .................................................................
    // 
    // -->
    // insertarPersona() <--datos:{dni:Texto, nombre:Texto: apellidos:Texto}
     // ................................................................
     buscarPersonas = persona.buscarPersonas

    // dni:Texto
    // -->
    // buscarPersonaPorDNI() <--
    // <--
    // {dni:Texto, nombre:Texto: apellidos:Texto}
    // .................................................................
    
    buscarPersonaConDNI = persona.buscarPersonaConDNI
    // .................................................................
    // datos:{dni:TXT, codigo:Texto: }
    // -->
    // desmatricular() -> 
    // .................................................................
    desmatricular = matricula.desmatricular
    // .................................................................
    // datos:{dni:TXT, codigo:Texto: }
    // -->
    // buscarNotaPorDniCodigo() -> nota:R
    // .................................................................
    buscarNotaPorDniCodigo = matricula.buscarNotaPorDniCodigo
     // .................................................................
    // datos:{dni:TXT, codigo:Texto, nota:R }
    // -->
    // MatriculaPorDni() -> 
    // .................................................................
    updateNotaPorDniCodigo = matricula.updateNotaPorDniCodigo
    
    // .................................................................
    // datos:{dni:TXT, codigo:Texto: }
    // -->
    // MatriculaPorDni() -->
    // .................................................................
    MatriculaPorDni = matricula.MatriculaPorDni
        // dni:Texto
    // -->
    // buscarMatriculaPorDni() <--
    // <--
    // {dni:Texto, codigo:Texto}
    // .................................................................
    buscarMatriculaPorCursoAsignatura = matricula.buscarMatriculaPorCursoAsignatura
        // -->
    // buscarMatriculaPorDni() <--
    // <--
    // {dni:Texto, codigo:Texto}
    // .................................................................
    buscarMatriculaPorDni = matricula.buscarMatriculaPorDni
     // .....................................................
     // .................................................................
    // datos:{codigo:TXT, nombre:Texto: grado:Texto}
    // -->
    // insertarAsignatura() -->
    // .................................................................
    insertarAsignatura = asignatura.insertarAsignatura 

        // codigo:Texto
    // -->
    // buscarAsignaturaPorCodigo() <--
    // <--
    // {codigo:Texto, nombre:Texto: grado:Texto}
    // .................................................................
    buscarAsignaturaPorCodigo = asignatura.buscarAsignaturaPorCodigo
       // APELLIDO:Texto
    // -->
    // asignaturasPorApellido() <--
    // <--
    // {codigo:Texto, nombre:Texto:, grado:texto }
    // .................................................................
    asignaturasPorApellido = asignatura.asignaturasPorApellido
      // .................................................................
    // datos:{nombre:TXT, codigo:Texto }
    // -->
    // updateNombrePorCodigo() -> 
    // .................................................................
    updateNombrePorCodigo = asignatura.updateNombrePorCodigo
    // .................................................................
    // datos:{dni:Texto, cargaLectiva: int}
    // -->
    // insertarProfesor() -->
    // .................................................................
   
    insertarProfesor = profesor.insertarProfesor
// .................................................................
    // datos:{dni:Texto, cargaLectiva: int}
    // -->
    // updateCargaLectivaPorDni() -->
    // .................................................................
   
    updateCargaLectivaPorDni = profesor.updateCargaLectivaPorDni

    // dni:Texto
    // -->
    // buscarProfesorPorDNI() <--
    // <--
    // {dni:Texto, cargaLectiva: int}
    // .................................................................
    
    buscarProfesorConDNI = profesor.buscarProfesorConDNI

    
    // .................................................................
    // datos:{dni:TXT, codigo:Texto: }
    // -->
    // ImpartePorDni() -->
    // .................................................................

    impartePorDni = imparte.impartePorDni
        // dni:Texto
    // -->
    // buscarImpartePorDni() <--
    // <--
    // {dni:Texto, codigo:Texto}
    // .................................................................
    buscarImpartePorDni = imparte.buscarImpartePorDni

} // class
// .....................................................................
// .....................................................................
