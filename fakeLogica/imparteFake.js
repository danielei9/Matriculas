

//  Imparte -------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
async function insertarImparte() {
    var datosImparte = {
        dni : document.getElementById('dni').value,
        codigo : document.getElementById('codigo').value
    };
        fetch('/insertarImparte', {
            method: 'POST',
            body: JSON.stringify( datosImparte ),
            headers: { 'Content-Type': 'application/json' }
            }).then(function(res){
                if(res.status == 400){
                    alert("CargaLectiva Superada")
                }
                if(res.status == 404){
                    alert("Dni no de profesor")
                }
                buscarImparte();
                return res.json()
            })
              .catch(err => function(err){
                  if (err) {alert("Dni no de profesor")}
              });;
        }
//-----------------------------------------------------------------------------------------------------------------
    function buscarImparte(){
        fetch('/buscarImparte', {
            method: 'POST',
            body: "",
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => representImparteHtml(json)).catch(err => function(err){
              if (err) {alert(err)}
          });;
    }
    function buscarCreditosPorDni(dni){
        fetch('/buscarCreditosPorDni', {
            method: 'POST',
            body: "{\"dni\":\""+dni+"\"}",
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => calculate(json)).catch(err => function(err){
              if (err) {alert(err)}
          });;
    }
    
function borrarImparte(dni,codigo){
    // creamos una etiqueta script
    fetch('/borrarPersona', {
        method: 'POST',
        body: "{\"dni\":\""+dni+"\",\"codigo\":\""+codigo+"\"}",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => representPersonaHtml(json))
      .catch(err => function(err){
          if (err) {alert(err)}
      });;
}
//-----------------------------------------------------------------------------------------------------------------
// cuando se pulsa en el enlace
btnBuscarImparte.onclick = function(e) {
    // evitamos la acción por defecto
    e.preventDefault();
    // creamos una etiqueta script
    buscarImparte();
}
function calculate(json){
    let total;
for(let i=0;i<json.length();i++){
    total += json[i].creditos 
}
return total/(json.length()-1)
}
//-----------------------------------------------------------------------------------------------------------------
function representImparteHtml(json){
    document.getElementById("sectionAdd").innerHTML = '<h4> Añadir Imparte</h4> <label for="dni">DNI</label>    <input type="text" name="dni" id="dni"> <label for="codigo">codigo</label>      <input type="text" name="codigo" id="codigo">    <a class="btn btn-primary btn-lg" href="#" role="button" id="btnBuscarImparte" onClick="insertarImparte();">Añadir &raquo; </a>   <br>';       
    document.getElementById("sectionFilter").innerHTML = ''
    document.getElementById("trTable").innerHTML = ' <th scope="col" id="col1">DNI</th><th scope="col" id="col2">CODIGO</th>';       
    document.getElementById("title").innerHTML = 'Imparte';
    document.getElementById("tbody_").innerHTML = '';
    console.log(json)
    for (let i = 0; i<json.length; i++){
        document.getElementById("tbody_").innerHTML += '<tr><th scope="row">'+ json[i].dni +'</th><td>'+ json[i].codigo + '</td>' +'</th>';
    }
}
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------