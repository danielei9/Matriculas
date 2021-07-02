
function buscarAlumno(){
    var datosAlumno = {
        codigo : document.getElementById('codigo').value,
        curso : document.getElementById('curso').value
    }

    console.log(datosAlumno)

    fetch('/buscarMatriculaPorCursoAsignatura', {
        method: 'POST',
        body: JSON.stringify( datosAlumno ),
        headers: { 'Content-Type': 'application/json' }
    }).then(function(res) {
        if(res.status == 400){
            alert("Problema")
        }
        if(res.status == 404){
            alert("No existe asignatura")
        }
        return res.json()
        }).then(json => representAlumnosHtml(json,false))
        .catch(err => function(err){
          if (err) {alert(err)}
      });;
}

// cuando se pulsa en el enlace
btnBuscarAlumno.onclick = function(e) {
    // evitamos la acción por defecto
    e.preventDefault();
    // creamos una etiqueta script
    //buscarAlumno()
    representAlumnosHtml({},false)
}

function filtrarUser(){

    var datosAlumno = {
        dni : document.getElementById('dni').value
    }

    console.log(datosAlumno)

    fetch('/buscarMatriculaPorDni', {
        method: 'POST',
        body: JSON.stringify( datosAlumno ),
        headers: { 'Content-Type': 'application/json' }
    }).then(function(res) {
        if(res.status == 400){
            alert("Problema")
        }
        if(res.status == 404){
            alert("No existe dni")
        }
        return res.json()
        }).then(json => representAlumnosHtml(json,true))
        .catch(err => function(err){
          if (err) {alert(err)}
      });;
}

function representAlumnosHtml(json,filterDni){
    document.getElementById("sectionFilter").innerHTML = '<h4> Filtrar Alumno</h4>  <label for="codigo">codigo</label>    <input type="text" name="codigo" id="codigo"> <label for="curso">curso</label>       <input type="text" name="curso" id="curso">      <a class="btn btn-primary btn-lg" href="#" role="button" id="btnBuscarImparte" onClick="buscarAlumno();">Añadir &raquo; </a> <br>';       
    document.getElementById("sectionAdd").innerHTML = '<h4> Filtrar Alumno por DNI</h4>  <label for="dni">dni</label>    <input type="text" name="dni" id="dni"> <a class="btn btn-primary btn-lg" href="#" role="button" id="btn_" onClick="filtrarUser();">Añadir &raquo; </a> <br>'
    document.getElementById("trTable").innerHTML = ' <th scope="col" id="col1">CODIGO</th><th scope="col" id="col">Nombre</th><th scope="col" id="col2">DNI</th><th scope="col" id="col3">nota</th><th scope="col" id="col3">curso</th>';       
    document.getElementById("title").innerHTML = 'Alumnos En Asignatura';
    document.getElementById("tbody_").innerHTML = '';
    console.log(json)
    if(filterDni){
        document.getElementById("trTable").innerHTML = ' <th scope="col" id="col1">CODIGO</th><th scope="col" id="col2">DNI</th><th scope="col" id="col3">nota</th><th scope="col" id="col3">curso</th><th scope="col" id="col3"></th>';       
        
        var notaMedia=0;
        var notaMedia_="w";
        for (let i = 0; i<json.length; i++){
            console.log(json[i])
            
                document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ json[i].codigo +'</th><td>'+ json[i].dni + '</td>' +'</th><td>'+ json[i].nota + '</td>'  +'</th><td>'+ json[i].curso + '</td></tr>';
                notaMedia += parseInt(json[i].nota);
           
        }
        notaMedia = notaMedia/parseInt(json.length)
        console.log("NotaMedia: "+notaMedia.toFixed())
    
        switch (parseInt(notaMedia.toFixed())){
            case 0:
                notaMedia_= "insuficiente"
                break;
            case 1:
                notaMedia_= "insuficiente"
                break;
            case 2:
                notaMedia_= "insuficiente"
                break;
            case 3:
                notaMedia_= "insuficiente"
                break;
            case 4:
                notaMedia_= "insuficiente"
                break;
            case 5:
                notaMedia_= "suficiente"
                break;
            case 6:
                notaMedia_= "Bien"
                break;
            case 7:
                notaMedia_= "Notable"
                break;
            case 8:
                notaMedia_= "Notable"
                break;
            case 9:
                notaMedia_= "Sobresaliente"
                break;
            case 10:
                notaMedia_= "Sobresaliente"
    
                break;
    
        }
        console.log(notaMedia_)
        document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ '' +'</th><td>'+ notaMedia_ + '</td>' +'</th><td>'+ 'Nota: ' + '</td>'  +'</th><td>'+ notaMedia + '</td></tr>';

    }
    else{
        for (let i = 0; i<json.length; i++){
            console.log(json[i])
            
            document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ json[i].codigo +'</th><td>'+ json[i].nombre + '</td>' +'</th><td>'+ json[i].dni + '</td>' +'</th><td>'+ json[i].nota + '</td>'  +'</th><td>'+ json[i].curso + '</td></tr>';

           
        }

    }
  
  

}
