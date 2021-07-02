/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           Logica.js
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................ 
describe("Test 6: Insertar un registro en la tabla Imparte", function () {
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
    it("puedo insertar un registro Imparte",
        async function () {
            await laLogica.impartePorDni({
                dni: "1234A",
                codigo: "0005"
            })
            var res = await laLogica.buscarImpartePorDni("1234A")
            assert.equal(res.length, 1, "¿No hay un resulado?")
        }) // it
it("DNI de Imparte es profesor",
async function () {
    await laLogica.buscarImpartePorDni("1234A")
    var res = await laLogica.buscarProfesorConDNI("1234A")
    assert.equal(res.length, 1, "¿No hay un resulado?")
    assert.equal(res[0].dni, "1234A", "¿No es el profesor esperado?")
}) // it

it("Solo imparte DNI de los profesores",
async function () {
    var error = null
    try{
        await laLogica.impartePorDni({
            dni: "123214A",
            codigo: "0005"
        })
    }
    catch(err){
        error = err
        
    }
    assert(error, "El DNI de Imparte pertenece a personas existentes"); 
}) // it

}) // describe 