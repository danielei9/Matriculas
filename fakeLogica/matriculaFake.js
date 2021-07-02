
//  MATRICULAS ---------------------------------------------------------------------------------------------------------------------
function insertarMatricula() {
    var datosMatricula = {
        dni : document.getElementById('dni').value,
        codigo : document.getElementById('codigo').value,
        nota : document.getElementById('nota').value ,
        curso : document.getElementById('curso').value
    };
        fetch('/insertarMatricula', {
            method: 'POST',
            body: JSON.stringify( datosMatricula ),
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
// ---------------------------------------------------------------------------------------------------------------------
function buscarMatricula(){
    fetch('/buscarMatriculas', {
        method: 'POST',
        body: "",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => representMatriculaHtml(json)).catch(err => function(err){
          if (err) {alert(err)}
      });;
}
// ---------------------------------------------------------------------------------------------------------------------
// cuando se pulsa en el enlace
btnBuscarMatriculas.onclick = function(e) {
    // evitamos la acción por defecto
    e.preventDefault();
    // creamos una etiqueta script
    buscarMatricula()
}
// ---------------------------------------------------------------------------------------------------------------------
function representMatriculaHtml(json){
    document.getElementById("sectionFilter").innerHTML = ''
        document.getElementById("sectionAdd").innerHTML = '<h4> Añadir Matricula</h4>   <label for="dni">DNI</label>    <input type="text" name="dni" id="dni"> <label for="codigo">Codigo</label>      <input type="text" name="codigo" id="codigo">       <label for="nota">nota</label> <input type="text" name="nota" id="nota">       <label for="curso">curso</label>       <input type="text" name="curso" id="curso">        <a class="btn btn-primary btn-lg" href="#" role="button" id="btnBuscarImparte" onClick="insertarMatricula();">Añadir &raquo; </a>  <br>';       
        document.getElementById("trTable").innerHTML = ' <th scope="col" id="col1">DNI</th><th scope="col" id="col2">codigo</th><th scope="col" id="col3">Curso</th><th scope="col" id="col3">Nota</th><th scope="col" id="col3">Delete</th>';       
        document.getElementById("title").innerHTML = 'Matriculas';
        document.getElementById("tbody_").innerHTML = '';
        console.log(json)
        for (let i = 0; i<json.length; i++){
            document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ json[i].dni +'</th><td>'+ json[i].codigo + '</td>' +'</th><td>'+ json[i].curso + '</td>'  +'</th><td>'+ json[i].nota + '</td><td><a style="text-decoration:none;" href="#" onclick="borrarMatricula(\'' + json[i].dni + '\')">❌</a></td></tr>';
        }
}
// ---------------------------------------------------------------------------------------------------------------------
