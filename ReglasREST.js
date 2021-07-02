/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           Logica.js
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
const path = require('path')
const Logica = require('./logica/Logica.js')
var laLogica
function cargarLogica( fichero ) {
    return new Promise( (resolver, rechazar) => {
         laLogica = new Logica( fichero,
            function( err ) {
                if ( err ) {
                    rechazar( err )
                } else {
                    resolver( laLogica )
                }
            }) // new
    }) // Promise
} // ()
cargarLogica('./bd/datos.bd')
// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function (servidorExpress) {
    servidorExpress.get('/',(request,response) =>{
        response.sendFile(path.resolve(__dirname,'index.html'))
    })
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get("/prueba/", function (peticion, respuesta) {
        console.log(" * GET /prueba ");
        respuesta.send("¡Funciona!");
                    respuesta.send("OK")

    }); // get /prueba
    // .......................................................
    // GET /longitud/<palabra>
    // .......................................................
    servidorExpress.get("/longitud/:palabra",
        function (peticion, respuesta) {
            console.log(" * GET /longitud ");
            var palabra = peticion.params.palabra;
            var solucion = {
                palabra: palabra,
                longitud: palabra.length
            };
            respuesta.send(JSON.stringify(solucion))

        }); // get /longitud
    // .......................................................
    // GET /dividir?a=<num>&b=<num>
    // .......................................................
    servidorExpress.get("/dividir", function (peticion, respuesta) {
        console.log(" * GET /dividir ");
        var a = peticion.query.a;
        var b = peticion.query.b;
        if (isNaN(a) || isNaN(b) || b == 0) {
            // si a o b no son números, o b es 0
            // no se puede dividir
            // (400 = bad request)
            respuesta.status(400).send(" no puedo dividir ");
            return
        }
        var solucion = {
            a: a,
            b: b,
            division: a / b
        };
        respuesta.send(JSON.stringify(solucion))
    }); // get /dividir
    // .......................................................
    // POST /alta
    // .......................................................
    servidorExpress.post("/alta", function (peticion, respuesta) {
        console.log(" * POST /alta ");
        var datos = JSON.parse(peticion.body);
        console.log(datos.dni);
        console.log(datos.nombre);
        console.log(datos.apellidos);
        // supuesto procesamiento
        if (datos.dni == "1234A") {
            respuesta.send("OK")
        } else {
            // 404 = not found
            respuesta.status(404).send("no acertaste con el dni")
        }
    }) //
    
    
    
    servidorExpress.post("/buscarMatriculaPorCursoAsignatura", async function (req, res) {
        console.log(" * POST /buscarMatriculaPorCursoAsignatura ");
        
       
        try{
            var datos = JSON.parse(req.body);
            console.log(datos);
            let busqueda =  await laLogica.buscarMatriculaPorCursoAsignatura(datos).catch(err=>{
                res.status(404).send(err)
                console.log(err)
            })
            //console.log(busqueda.dni)
            if(busqueda.length > 0){
                    console.log("buscarMatriculaPorCursoAsignatura")
                    res.status(200).send(busqueda)   
            }
            else{
                console.log("No hay datos")
                res.status(404).send("No hay datos")
            }
        }
        catch(err){
            console.log("catch")
           
            if(err){
                console.log(err)
                res.status(404).send(err)
            }

        }
            
    }) //




    
    servidorExpress.post("/buscarMatriculaPorDni", async function (req, res) {
        console.log(" * POST /buscarMatriculaPorDni ");
        
       
        try{
            var datos = JSON.parse(req.body);
            console.log(datos);
            let busqueda =  await laLogica.buscarMatriculaPorDni(datos.dni).catch(err=>{
                res.status(404).send(err)
                console.log(err)
            })
            //console.log(busqueda.dni)
            if(busqueda.length > 0){
                    console.log("buscarMatriculaPorDni")
                    res.status(200).send(busqueda)   
            }
            else{
                console.log("No hay datos")
                res.status(404).send("No hay datos")
            }
        }
        catch(err){
            console.log("catch")
           
            if(err){
                console.log(err)
                res.status(404).send(err)
            }

        }
            
    }) //







    servidorExpress.post("/updateCargaLectivaPorDni", async function (req, res) {
        console.log(" * POST /updateCargaLectivaPorDni ");
        //console.log(req);
        var datos = JSON.parse(req.body);
        try{
            console.log("DNI : "+ datos.dni)
            let busqueda =  await laLogica.buscarProfesorConDNI(datos.dni).catch(err=>{
                console.log(err)
            })
            console.log(busqueda.dni)
            if(busqueda.length > 0){
                if(busqueda[0].dni == datos.dni){
                    console.log("Update cargaLectica")
                    res.status(200).send( await laLogica.updateCargaLectivaPorDni(datos).catch(err=>{
                        console.log(err)
                    }))
                }              
            }
            else{
                console.log("Este dni no es de un profesor")
                res.status(404).send("Este dni no es de un profesor")
            }
        }
        catch(err){
            console.log("catch")
           
            if(err){
                console.log(err)
                res.status(404).send(err)
            }

        }
            
    }) //

    servidorExpress.post("/insertarImparte", async function (req, res) {
        console.log(" * POST /insertarImparte ");
        //console.log(req);
        var datos = JSON.parse(req.body);
        try{
            let creditos = await laLogica.buscarCreditosPorDni(datos.dni).catch(err=>{
                console.log(err)
            })
            let busqueda =  await laLogica.buscarProfesorConDNI(datos.dni).catch(err=>{
                console.log(err)
            })
            let totalCreditos=0;
            for(let i=0;i<creditos.length;i++){
   
                console.log("Creditos: ")
                console.log(creditos[i].creditos)
                totalCreditos += parseInt(creditos[i].creditos )
            }
            console.log("total Creditos de prof: " + totalCreditos)
            console.log("Creditos maximos:" + busqueda[0].cargaLectiva)           
            if( totalCreditos <  busqueda[0].cargaLectiva){
                console.log(busqueda.dni)
                if(busqueda.length > 0){
                    if(busqueda[0].dni == datos.dni){
                        console.log("insertandoImparte")
                        res.status(200).send( await laLogica.impartePorDni(datos).catch(err=>{
                            console.log(err)
                        }))
                    }              
                }
                else{
                    console.log("Este dni no es de un profesor")
                    res.status(404).send("Este dni no es de un profesor")
                }
            }
            else{
                console.log("Profesor con cargaLectiva Superada")
                res.status(400).send("Profesor con cargaLectiva Superada")
            }
           
        }
        catch(err){
            console.log("catch")
           
            if(err){
                console.log(err)
                res.status(404).send(err)
            }

        }
            
    }) //

    servidorExpress.post("/borrarPersona", async function (req, res) {
        console.log(" * POST /borrarPersona ");
        console.log(req.body)

        var datos = JSON.parse(req.body);           

      try{
        let busqueda =  await laLogica.borrarPersona(datos.dni).catch()
        }
        catch(err){
            console.log("catch")
            if(err)console.log(err)
        }
        
    }) //

    
    servidorExpress.post("/insertarPersona", async function (req, res) {
        console.log(" * POST /insertarPersona ");
  
        var datos = JSON.parse(req.body);           
      try{
        let busqueda =  await laLogica.buscarPersonaConDNI(datos.dni)
        if (busqueda.length > 0){
           if (busqueda[0].dni == datos.dni) {
            console.log("Ya existe esta persona")
            res.status(400).send("Ya existe esta Persona")
            } 
        }
        else {
            console.log("insertandoPersona")
           
            res.status(200).send( await laLogica.insertarPersona(datos))
            }
        }
        catch(err){
            console.log("catch")
            if(err)console.log(err)
        }
        
    }) //
    
    servidorExpress.post("/insertarProfesor", async function (req, res) {
        console.log(" * POST /insertarProfesor ");
        //console.log(req);
        var datos = JSON.parse(req.body);
       
        console.log(datos.dni);
        console.log(datos.cargaLectiva);
        // supuesto procesamiento   if (datos.dni == "1234A") {
            let busqueda =  await laLogica.buscarProfesorConDNI(datos.dni)
        try{
           if (busqueda.dni == null) {
            res.status(200).send(await laLogica.insertarProfesor(datos))
            } 
            else {
            // 404 = not found
            console.log("Ya existe este profesor")
            res.status(400).send("Ya existe este profesor")
            }
        }catch(err){
            if(err){
                console.log(err)
                res.status(404).send("Error con el dni")
                
            }
        }
    }) //
    
    servidorExpress.post("/insertarAsignatura", async function (req, res) {
        console.log(" * POST /insertarAsignatura ");
        //console.log(req);
        var datos = JSON.parse(req.body);
        // supuesto procesamiento
        try{
            let busqueda =  await laLogica.buscarAsignaturaPorCodigo(datos.codigo)
            if (busqueda.length > 0){
               if (busqueda[0].codigo == datos.codigo) {
                console.log("Ya existe este codigo de asignatura")
                res.status(400).send("Ya existe este codigo de asignatura")
                } 
            }
            else {
                console.log("insertandoAsignatura")
                res.status(200).send( await laLogica.insertarAsignatura(datos).catch(err =>{
                    console.log(err)
                }))
                }
        }
        catch(err){
            console.log("catch")
            if(err)console.log(err)
        }
            
    }) //

   

    servidorExpress.post("/insertarMatricula", async function (req, res) {
        console.log(" * POST /insertarMatricula ");
        //console.log(req);
        var datos = JSON.parse(req.body);
        // supuesto procesamiento
        if (res.statusCode == 200) {
            res.send(await laLogica.MatriculaPorDni(datos))
        } else {
            // 404 = not found
            res.status(404).send("No existe parametro DNI")
        }
    }) //
        // .......................................................
        servidorExpress.post("/buscarPersonas", async function (peticion, respuesta) {
            console.log(" * POST /buscarPersonas ");
            try{
                let res = await laLogica.buscarPersonas()
                respuesta.send(res)
            }catch(err){
                respuesta.send(err)
            }
          
           
        })
        // .......................................................
        servidorExpress.post("/buscarProfesores", async function (peticion, respuesta) {
            console.log(" * POST /buscarProfesores ");
            respuesta.send(await laLogica.buscarProfesores())
        })
          // .......................................................
          servidorExpress.post("/buscarMatriculas", async function (peticion, respuesta) {
            console.log(" * POST /buscarMatriculas ");
            respuesta.send(await laLogica.buscarMatriculas())
        })
     // .......................................................
     servidorExpress.post("/buscarAsignaturas", async function (peticion, respuesta) {
        console.log(" * POST /buscarAsignaturas ");
        respuesta.send(await laLogica.buscarAsignaturas());
    })
         // .......................................................
    servidorExpress.post("/buscarImparte", async function (peticion, respuesta) {
        console.log(" * POST /buscarImparte ");
        respuesta.send(await laLogica.buscarImparte());
    })

    servidorExpress.post("/buscarCreditosPorDni", async function (peticion, respuesta) {
        var datos = JSON.parse(peticion.body);
        console.log(" * POST /buscarCreditosPorDni ");       
        console.log(" * POST /buscarCreditosPorDni ");
        respuesta.send(await laLogica.buscarCreditosPorDni(datos));
    })

};
// ()
// .....................................................................
// .....................................................................

