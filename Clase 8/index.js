const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use('/img', express.static('img'));

function apertura(titulo,texto){
    const apertura = '<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><style>.mySlides {display:none;} body{margin-left: 2%;margin-right: 2%;width:96%;}</style></head><body>'
    return `${apertura}<title>${titulo}</title><h1>${titulo}</h1><p>${texto}</p>`
}

function cierre(){
    const cierre = '</body></html>'
    return cierre
}

function remplazar(texto){
  let string = texto.split(' ').join('_')
  return string
}

function volver(texto){
  let string = texto.split('_').join(' ')
  return string
}

function fecha(f){
    let a = f.slice(0,4)
    let m = f.slice(5,7)
    let d = f.slice(8,10)
    let date = `${d}/${m}/${a}`
    return date
}

app.get('/', function(req, res){
/* El fetch lo hice en base al json de tarea que era la page 1 de los most popular, 
pero cambiandole el numero se van viendo las paginas (hay un total de 859) 
por eso puse el length de los show para calcular la cantidad de la primera pagina */ 
    
    fetch('https://www.episodate.com/api/most-popular?page=1')
    .then(response => response.json())
    .then(json => {
    let shows = ''
    let cadenas =[]
    let cadena = ''
    for (show of json.tv_shows){shows += `<a href=/show/${show.permalink}><li>${show.name}</li></a>`;
    cadenas.push(show.network);
    }

    for (i in cadenas.sort()){
        if (cadenas[i]!== cadenas[i-1]){
        cadena+=`<a href=/cadenas/${remplazar(cadenas[i])}><li>${cadenas[i]}</li></a>`}}
    
    
    res.send(apertura('Most Popular TV Shows',`<img src="/img/tvShowsLogo.png"><p>Aqui podras ver el listado de los ${json.tv_shows.length} shows mas populares, haz click en la que mas te gusta:<p>`)+`<ul>${shows}</ul>`+`
    <h3>Separado por cadenas:</h3>
    <ul>${cadena}</ul>`+cierre());

})     
 });


app.get('/show/:permalink/', function(req, res){
    fetch('https://www.episodate.com/api/show-details?q='+req.params.permalink)
    .then(response => response.json())
    .then(json => {
    let final =''
    if(json.tvShow.end_date === null){final = '<h4>Sigue en el aire</h4>'}
    else{final = `Final: ${json.tvShow.end_date}`} 
    let genero= ''
    for (gen of json.tvShow.genres){genero += gen+' - '}
    let carousel = ''
    for(picture of json.tvShow.pictures){carousel += `
    <img class="mySlides" src="${picture}" alt="${req.params.permalink}" style="width:100%">`}
    let temporada =""
    let cantTemporadas = 0
    for (sea of json.tvShow.episodes){if(sea.episode ===1){temporada+=`<a href=/show/${req.params.permalink}/${sea.season}><li>Temporada ${sea.season}</li><a>`;cantTemporadas++}}
    
    res.status(200).send(apertura(json.tvShow.name, `Descripción: ${json.tvShow.description}. <a style="color:blue" href=${json.tvShow.description_source} target="_blank"><strong>Source</strong></a>`)+
    `<h4>Fecha de inicio: ${fecha(json.tvShow.start_date)}</h4>`+final+`<h4>Genero: ${genero.slice(0,-2)} </h4>`
    +
    `<h4>Temporadas: </h4>`+`<ul>${temporada}</ul><h5>Hasta el momento tiene un total de ${cantTemporadas} temporadas</h5>`
    +
    `
    <div style="margin-top: 2%;margin-bottom: 2%;">
    <h2 class="w3-center">Imagenes</h2>
  <div class="w3-content w3-display-container" style="width:50%; margin: 0 auto;">
   ${carousel}
    <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
    <button  class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
    </div>
    </div>
    `+
    `
    <form action="/" style="margin: 3% auto">
    <input type="submit" value="Go to Home" />
    </form>
    `+`<script>
    var slideIndex = 1;
    showDivs(slideIndex);
    
    function plusDivs(n) {
      showDivs(slideIndex += n);
    }
    
    function showDivs(n) {
      var i;
      var x = document.getElementsByClassName("mySlides");
      if (n > x.length) {slideIndex = 1}
      if (n < 1) {slideIndex = x.length}
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      x[slideIndex-1].style.display = "block";  
    }
    </script>`+cierre());
    })     
 });

 app.get('/show/:permalink/:season', function(req, res){
    fetch('https://www.episodate.com/api/show-details?q='+req.params.permalink)
    .then(response => response.json())
    .then(json => {
    
    let episodios =""
    let cantEpisodios = 0
    for (sea of json.tvShow.episodes){if(sea.season=== parseFloat(req.params.season)){episodios+=`<li>Episodio N° ${sea.episode} Titulo: ${sea.name}</li><a>`;cantEpisodios++}}  
    
    res.status(200).send(apertura(`${json.tvShow.name} - temporada ${req.params.season}`, `Episodios: <ul> ${episodios}</ul><h5>Esta temporada tuvo ${cantEpisodios} episodios</h5>`)+
    `
    <form action=/show/${req.params.permalink} style="margin: 3% auto">
    <input type="submit" value="Go Back" />
    </form>
    `+cierre());
    })     
 });


 app.get('/cadenas/:network', function(req, res){
    fetch('https://www.episodate.com/api/most-popular?page=1')
    .then(response => response.json())
    .then(json => {
    
    let series =""
    let cantSeries = 0
    for (serie of json.tv_shows){if(serie.network=== req.params.network || serie.network=== volver(req.params.network)){series+=`<li>${serie.name}</li>`;cantSeries++}}  
    
    res.status(200).send(apertura(`${volver(req.params.network)}`, `<ul> ${series}</ul><h5>Esta cadena tuvo ${cantSeries} series en los mas populares</h5>`)+
    `
    <form action=/ style="margin: 3% auto">
    <input type="submit" value="Home" />
    </form>
    `+cierre());
    })     
 });



app.listen(8080, function(){
    console.log("Iniciado");
});

