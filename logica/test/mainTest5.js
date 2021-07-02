/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           Logica.js
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
// ........................................................
// mainTest5.js --> Profesor Logica Test
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
const { debug } = require("console")
// ........................................................
// main ()
// ........................................................
describe("Test 5: insertar un Profesor", function () {
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
    // ....................................................
    // ....................................................
    it("puedo insertar un Profesor",
        async function () {
            await laLogica.insertarProfesor({
                dni: "1234A",
                cargaLectiva: 10
            })
            var res = await laLogica.buscarProfesorConDNI("1234A")
            assert.equal(res.length, 1, "¿no hay un resulado?")
            assert.equal(res[0].dni, "1234A", "¿no es 1234A?")
           
        }) // it
     
    // ....................................................
    // ....................................................
    it("no puedo insertar una Profesor con dni que ya está",
        async function () {
            var error = null
            try {
                await laLogica.insertarProfesor({
                    dni: "1234A",
                    cargaLectiva: 10
                })
            } catch (err) {
                error = err
            }
            assert(error, "¿Ha insertado el dni que ya estaba 1234A? (¿No ha pasado por el catch()?")
        }) // it
        // ....................................................
    // ....................................................
    it("Profesor es una persona existente (ponemos un DNI de alguien que no existe)",
    async function () {
        var error = null
        try{
            await laLogica.insertarProfesor({
                dni: "122134A",
                cargaLectiva: 10
            })
           // var res = await laLogica.buscarProfesorConDNI("1234A")
        }catch(err){
            error = err
        }
    
        assert(error, "El DNI de profesor no pertenece a personas existentes");
        //assert.equal(res[0].dni, "122134A", "¿no es 1234A?")
           
    }) // it
    it("puedo Cambiar cargaLectiva a un Profesor",
    async function () {
        await laLogica.updateCargaLectivaPorDni({
            dni: "1234A",
            cargaLectiva: 27
        })
        var res = await laLogica.buscarProfesorConDNI("1234A")
        assert.equal(res.length, 1, "¿no hay un resulado?")
        assert.equal(res[0].dni, "1234A", "¿no es 1234A?")
        assert.equal(res[0].cargaLectiva, 27, "¿no es 27?")
       
    }) // it
    it("intento Cambiar cargaLectiva a un dni NO profesor y salta Error",
    async function () {
        var error = null
        try{
            await laLogica.updateCargaLectivaPorDni("1212334A",27)
            var res = await laLogica.buscarProfesorConDNI("1212334A")        
        }
        catch(err){
            error = err
        }

        assert(Error, "¿Al intentar cambiar lo ha hecho?")
      
       
    }) // it
// ....................................................
// ....................................................
    // ....................................................
    // ....................................................
    it("cerrar conexión a la base de datos",
        async function () {
            try {
                await laLogica.cerrar()
            } catch (err) {
                // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
                throw new Error("cerrar conexión a BD fallada: " + err)
            }
        }) // it
}) // describe
