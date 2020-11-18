const express = require('express');
const nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/static", express.static('./static/'));
session = require('express-session');

app.use(session({
  secret: 'elSecreto',
  name: 'sessionId',
  proxy: true,
  resave: true,
  saveUninitialized: true ,
  cookie: { maxAge: 24 * 60 * 60 * 1000  }  
}));


nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
res.render('index.html')    
});

app.post('/login', function(req, res) {
  var datos = [{"user":"dami","password":"1234","nivel":2},
  {"user":"coco","password":"1111","nivel":1}]
  var logeado = false
for (dato of datos){
if ( req.body.user === dato.user && req.body.pass === dato.password){
req.session.user = req.body.user
req.session.pass = req.body.pass
req.session.level = dato.nivel
logeado = true
}}

if (logeado === true){
if (req.session.level === 1){
res.write(`<h1> ${req.session.user} - Admin logeado con exito</h1> <a href="/pagina1/${req.session.user}">Ingresar - Administrador</a> <a href="/pagina2">Ingresar a sitio </a>`)   
}
else {res.write(`<h1> ${req.session.user}!!! </h1> <a href="/pagina2/${req.session.user}">Seguir comprando</a>`)}
}
else{res.write(`<h1>${req.body.user} no existe <a href="/">HOME</a>`)}
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send(`<h1>Sesión cerrada!</h1> <a href="/">HOME</a>`);
});

app.get('/pagina1/:user', function (req, res) {
  res.send(`<h1>Administrador ${req.params.user}</h1> <a href="/logout">Logout</a>`);
});

app.get('/pagina2/:user', function (req, res) {
  res.send(`<h1>Podes comprar ${req.params.user}</h1> <a href="/logout">Logout</a>`);;
});


app.listen(8080);