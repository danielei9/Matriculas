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
describe("Test 2: insertar una asignatura", function () {
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
    it("puedo insertar una asignatura",
        async function () {
            await laLogica.insertarAsignatura({
                codigo: "0005",
                nombre: "Señales",
                grado: "GTI",
                creditos: "10"
            })
            var res = await laLogica.buscarAsignaturaPorCodigo("0005")
            assert.equal(res.length, 1, "¿No hay un resulado?")
            assert.equal(res[0].codigo, "0005", "¿No es 0005?")
            assert.equal(res[0].nombre, "Señales", "¿No es Señales?")
            assert.equal(res[0].creditos, "10", "¿No es 10?")
        })
it("Puedo actualizar un nombre de una asignatura",
async function () {
    await laLogica.updateNombrePorCodigo({
        nombre: "Japones",
        codigo: "0005"
    })
    var res = await laLogica.buscarAsignaturaPorCodigo("0005")
    assert.equal(res.length, 1, "¿No hay un resulado?")
    assert.equal(res[0].codigo, "0005", "¿No es 0005?")
    assert.equal(res[0].nombre, "Japones", "¿No es Señales?")
}) // it
}) // describe
