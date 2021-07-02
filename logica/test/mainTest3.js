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
const { debug } = require("console")
// ........................................................
// main ()
// ........................................................ 
describe("Test 3: matricula", function () {
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
    it("puedo matricular",
        async function () {
            await laLogica.MatriculaPorDni({
                dni: "1234A",
                codigo: "0005",
                nota: "8",
                curso: "2"

            })
            var res = await laLogica.buscarMatriculaPorDni("1234A")
            assert.equal(res.length, 1, "¿No hay un resulado?")
            assert.equal(res[0].dni, "1234A", "¿No es 1234A?")
            assert.equal(res[0].codigo, "0005", "¿No es 0001?")
            assert.equal(res[0].nota, "8", "¿No es 8?")
            assert.equal(res[0].curso, "2", "¿No es 2?")
        }) // it
        it("puedo matricular A MARIA",
        async function () {
            await laLogica.MatriculaPorDni({
                dni: "1234B",
                codigo: "0005",
                nota: "7",
                curso: "1"

            })
            var res = await laLogica.buscarMatriculaPorDni("1234B")
            assert.equal(res.length, 1, "¿No hay un resulado?")
            assert.equal(res[0].dni, "1234B", "¿No es 1234B?")
            assert.equal(res[0].codigo, "0005", "¿No es 0001?")
            assert.equal(res[0].nota, "7", "¿No es 7?")
            assert.equal(res[0].curso, "1", "¿No es 1?")
        }) // it
        it("puedo DESmatricular A MARIA",
        async function () {
            let error = null;
            await laLogica.desmatricular({
                dni: "1234B",
                codigo: "0005"

            })
            try{
                var res = await laLogica.buscarNotaPorDniCodigo("1234B","0005")
            }
            catch(err){
                error = err
            }
            assert(Error, "Tiene que fallar por que no existe la que estamos buscando ya que hemos desmatriculado")
          
           
        }) // it
        
      
        it("puedo buscar por Curso Y Asignatura",
        async function () {
            await laLogica.buscarMatriculaPorCursoAsignatura({curso:"2",codigo:"0005"})
            var res = await laLogica.buscarMatriculaPorDni("1234A")
            assert.equal(res.length, 1, "¿No hay un resulado?")
            assert.equal(res[0].dni, "1234A", "¿No es 1234A?")
            assert.equal(res[0].codigo, "0005", "¿No es 0001?")
            assert.equal(res[0].nota, "8", "¿No es 8?")
            assert.equal(res[0].curso, "2", "¿No es 2?")
        }) // it
        it("intentar buscar una asignatura que no existe y da ERROR",
        async function () {
            var error = null
            try{  
                await laLogica.buscarMatriculaPorCursoAsignatura({curso:"3",codigo:"0004"})
                //var res = await laLogica.buscarMatriculaPorDni("1234A") 
            }
            catch(err){
                error = err
            }
    
            assert(Error, "¿Al intentar buscar una asignatura que no existe, lo ha hecho?")
    
        }) // it
        it("puedo cambiar nota segun dni y codigo",
        async function () {
            await laLogica.updateNotaPorDniCodigo("1234A","0005",2)
            let res = await laLogica.buscarNotaPorDniCodigo("1234A","0005")
            assert.equal(res.length, 1, "¿No hay un resulado?")
            assert.equal(res[0].nota, 2, "¿No es 5?")
        }) // it
       
}) // describe
