
//  PROFESORES ----------------------------------------------------------------------------------------------------------------------
//  Insertar  ----------------------------------------------------------------------------------------------------------------------
function modificarCargaLectiva(){
    var datosProfesor = {
        dni : document.getElementById('dni_mod').value,
        cargaLectiva : document.getElementById('cargaLectiva_mod').value 
        };
        fetch('/updateCargaLectivaPorDni', {
        method: 'POST',
        body: JSON.stringify( datosProfesor ),
        headers: { 'Content-Type': 'application/json' }
    }).then(function(res){
        if(res.status != 200){
            alert("Este dni no es de un profesor")
            return ''
        }
        buscarProfesor();
        return res.json()
    })
      .catch(err => function(err){
          if (err) {alert(err)}
      });;
}
function insertarProfesor() {
    var datosProfesor = {
        dni : document.getElementById('dni').value,
        cargaLectiva : document.getElementById('cargaLectiva').value 
        };
        fetch('/insertarProfesor', {
        method: 'POST',
        body: JSON.stringify( datosProfesor ),
        headers: { 'Content-Type': 'application/json' }
    }).then(function(res){
        if(res.status != 200){
            alert("Problema con el dni")
            return 'Problema con el dni'
        }
        buscarProfesor();
        return res.json()
    })
      .catch(err => function(err){
          if (err) {alert(err)}
      });;
    }
    
//   buscarg Profesor ----------------------------------------------------------------------------------------------------------------------

    function buscarProfesor(){
        fetch('/buscarProfesores', {
            method: 'POST',
            body: "",
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => representProfesorHtml(json)).catch(err => function(err){
              if (err) {alert(err)}
          });;
    }
//   onclick----------------------------------------------------------------------------------------------------------------------
// cuando se pulsa en el enlace
btnBuscarProfesor.onclick = function(e) {
    // evitamos la acción por defecto
    e.preventDefault();
    // creamos una etiqueta script
    buscarProfesor();
}
//   ----------------------------------------------------------------------------------------------------------------------
function representProfesorHtml(json){
    document.getElementById("sectionAdd").innerHTML = '<h4> Añadir Profesor</h4>   <label for="dni">DNI</label>    <input type="text" name="dni" id="dni"> <label for="cargaLectiva">cargaLectiva</label>      <input type="text" name="cargaLectiva" id="cargaLectiva">    <a class="btn btn-primary btn-lg" href="#" role="button" id="" onClick="insertarProfesor();">Añadir &raquo; </a>  <br>';       
    document.getElementById("sectionFilter").innerHTML = '<br><h4> Modificar Carga Lectiva</h4>   <label for="dni_mod">DNI</label>    <input type="text" name="dni_mod" id="dni_mod"> <label for="cargaLectiva_mod">cargaLectiva</label>      <input type="text" name="cargaLectiva_mod" id="cargaLectiva_mod">    <a class="btn btn-primary btn-lg" href="#" role="button" id="" onClick="modificarCargaLectiva();">Modificar &raquo; </a>  <br>';       

    document.getElementById("trTable").innerHTML = ' <th scope="col" id="col1">DNI</th><th scope="col" id="col2">Carga Lectiva</th><th scope="col" id="col2">Delete</th>';  
        document.getElementById("title").innerHTML = 'Profesor';
        document.getElementById("tbody_").innerHTML = '';

        console.log(json)
        for (let i = 0; i<json.length; i++){
            document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ json[i].dni +'</th><td>'+ json[i].cargaLectiva + '</td><td><a style="text-decoration:none;" href="#" onclick="borrarProfesor(\'' + json[i].dni + '\')">❌</a></td></tr>';
        }
}
//   ----------------------------------------------------------------------------------------------------------------------
