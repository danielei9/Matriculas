/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           Logica.js
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
// ........................................................
// mainTest4.js Logica Apellidos Y asignatura
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................ 
describe("Test 4: Apellidos y Asignatura", function () {
    // ....................................................
    // ....................................................
    var laLogica = null
    // ....................................................
    // ....................................................
     it("conectar a la base de datos", function (hecho) {
        laLogica = new Logica(
            "../bd/datos.bd",
            function (err) {
                if (err) {
                    throw new Error("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it
    
    it("puedo Buscar por apellido",
        async function () {
            await laLogica.asignaturasPorApellido({
                apellidos: "García Pérez",
                codigo: "0005"
            })
            var res = await laLogica.asignaturasPorApellido("García Pérez")
            assert.equal(res.length, 1, "¿No hay un resulado?")
            assert.equal(res[0].codigo, "0005", "¿No es correcto?")
        }) // it
        
}) // describe
