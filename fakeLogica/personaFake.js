//-------------------------------------------------------------
//  PERSONAS ----------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------

function insertarPersona() {
    var datosPersona = {
        dni : document.getElementById('dni').value,
        nombre : document.getElementById('nombre').value ,
        apellidos : document.getElementById('apellido').value
        };
        fetch('/insertarPersona', {
            method: 'POST',
            body: JSON.stringify( datosPersona ),
            headers: { 'Content-Type': 'application/json' }
    }).then(function(res){
        if(res.status == 400){
            alert("Problema con el dni")
        }
        buscarPersonas();
        return res.json()
    })
      .catch(err => function(err){
          if (err) {alert(err)}
      });;
    }
// ---------------------------------------------------------------------------------------------------------------------
function buscarPersonas(){
    // creamos una etiqueta script
    fetch('/buscarPersonas', {
        method: 'POST',
        body: "",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => representPersonaHtml(json))
      .catch(err => function(err){
          if (err) {alert(err)}
      });;
}

function borrarPersona(dni){
    // creamos una etiqueta script
    fetch('/borrarPersona', {
        method: 'POST',
        body: "{dni: '"+dni+"'}",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => representPersonaHtml(json))
      .catch(err => function(err){
          if (err) {alert(err)}
      });;
}
// ---------------------------------------------------------------------------------------------------------------------
// cuando se pulsa en el enlace
btnBuscarPersonas.onclick = function(e) {
    // evitamos la acción por defecto
    e.preventDefault();
    // creamos una etiqueta script
    buscarPersonas();
}
// ---------------------------------------------------------------------------------------------------------------------
    function representPersonaHtml(json){
        document.getElementById("sectionAdd").innerHTML = '<h4> Añadir Persona</h4>   <label for="dni">DNI</label>    <input type="text" name="dni" id="dni"> <label for="nombre">Nombre</label>      <input type="text" name="nombre" id="nombre">       <label for="apellido">Apellido</label>       <input type="text" name="apellido" id="apellido">        <a class="btn btn-primary btn-lg" href="#" role="button" id="btnBuscarImparte" onClick="insertarPersona();">Añadir &raquo; </a>  <br>';       
        document.getElementById("sectionFilter").innerHTML = ''
        document.getElementById("title").innerHTML = 'Persona';
        document.getElementById("tbody_").innerHTML = '';
        document.getElementById("trTable").innerHTML = ' <th scope="col" id="col1">DNI</th><th scope="col" id="col2">codigo</th><th scope="col" id="col3">Curso</th><th scope="col" id="col3">delete</th>';       
        document.getElementById("col1").innerHTML = 'DNI';
        document.getElementById("col2").innerHTML = 'NOMBRE';
        document.getElementById("col3").innerHTML = 'APELLIDOS';
        console.log(json)
        for (let i = 0; i<json.length; i++){
            document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ json[i].dni +'</th><td>'+ json[i].nombre +'</td><td>'+ json[i].apellidos +'</td><td><a style="text-decoration:none;" href="">❌</a></td></tr>';
        }
    }
// ---------------------------------------------------------------------------------------------------------------------
