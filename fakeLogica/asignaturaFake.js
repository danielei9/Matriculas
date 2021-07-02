
//  Asignaturas -----------------------------------------------------------------------------------------------------------

function insertarAsignatura() {
    var datosAsignatura = {
        codigo : document.getElementById('codigo').value,
        nombre : document.getElementById('nombre').value,
        grado : document.getElementById('grado').value ,
        creditos : document.getElementById('creditos').value
    };
        fetch('/insertarAsignatura', {
            method: 'POST',
            body: JSON.stringify( datosAsignatura ),
            headers: { 'Content-Type': 'application/json' }
            }).then(function(res){
                if(res.status != 200){
                    alert("Problema con Asignatura (posible codigo repetido)")
                    return 'Problema Asignatura'
                }
                buscarAsignaturas();
                return res.json()
            })
              .catch(err => function(err){
                  if (err) {alert(err)}
              });;
            }

function buscarAsignaturas(){
    fetch('/buscarAsignaturas', {
        method: 'POST',
        body: "",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => representAsignaturasHtml(json)).catch(err => function(err){
          if (err) {alert(err)}
      });;
}

// cuando se pulsa en el enlace
btnBuscarAsignaturas.onclick = function(e) {
    // evitamos la acción por defecto
    e.preventDefault();
    // creamos una etiqueta script
    buscarAsignaturas()
}

function representAsignaturasHtml(json){
    document.getElementById("sectionAdd").innerHTML = '<h4> Añadir Asignatura</h4>  <label for="codigo">codigo</label>    <input type="text" name="codigo" id="codigo"> <label for="nombre">Nombre</label>      <input type="text" name="nombre" id="nombre">       <label for="grado">grado</label>       <input type="text" name="grado" id="grado"> <label for="creditos">creditos</label>       <input type="text" name="creditos" id="creditos">      <a class="btn btn-primary btn-lg" href="#" role="button" id="btnBuscarImparte" onClick="insertarAsignatura();">Añadir &raquo; </a> <br>';       
    document.getElementById("sectionFilter").innerHTML = ''
        document.getElementById("trTable").innerHTML = ' <th scope="col" id="col1">CODIGO</th><th scope="col" id="col2">NOMBRE</th><th scope="col" id="col3">GRADO</th><th scope="col" id="col3">CREDITOS</th>';       
         document.getElementById("title").innerHTML = 'Asignaturas';
        document.getElementById("tbody_").innerHTML = '';
        console.log(json)
        for (let i = 0; i<json.length; i++){
            document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ json[i].codigo +'</th><td>'+ json[i].nombre + '</td>' +'</th><td>'+ json[i].grado + '</td>'  +'</th><td>'+ json[i].creditos + '</td></tr>';
        }
    }
