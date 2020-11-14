const express = require('express');
const nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/static", express.static('./static/'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
res.render('index.html')    
});

app.post('/turnos', function(req, res) {
var date = new Date();
var now = date. getFullYear();
var meses = ["Octubre","Noviembre","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre"]
var patente =  req.body.patente
var i = ''
if (patente.length===9 || patente.length===10){
  i = parseFloat(patente[patente.length - 4])
}
else if(patente.length===7 || patente.length===6){
  i = parseFloat(patente[patente.length - 1])
}
res.render(
  'turnos.html',{now:now, mes: meses[i], patente:patente.toUpperCase() ,year:req.body.year, km:parseFloat(req.body.km)})   
});

app.listen(8080);