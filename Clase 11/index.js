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

var auth = function(req, res, next) {
  if (req.session && req.session.level === 2)
    return next();
  else
	return res.status(401).send("No sos Usuario o No estas autorizado - solicitar permiso de Admin.");
};

var Allusers = function(req, res, next) {
  if (req.session && req.session.level)
    return next();
  else
	return res.status(401).send("Tu sesion expiró.");
};

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
req.session.level = dato.nivel
logeado = true
}}

if (logeado === true){
if (req.session.level === 2){
res.send(`<h1> ${req.session.user} - Admin logeado con exito</h1> <a href="/pagina1">Ingresar - Administrador</a> <br> <a href="/pagina2">Ingresar a sitio </a>`)   
}
else {res.send(`<h1> ${req.session.user}!!! </h1> <a href="/pagina2">Seguir comprando</a>`)}
}
else{res.send(`<h1>${req.body.user} no existe <a href="/">HOME</a>`)}
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send(`<h1>Sesión cerrada!</h1> <a href="/">HOME</a>`);
});

app.get('/pagina1', auth, function (req, res) {
  res.send(`<h1>Administrador ${req.session.user} </h1> <a href="/logout">Logout</a> <br> <a href="/pagina2">Go Shop</a>`);
});

app.get('/pagina2', Allusers, function (req, res) {
  res.send(`<h1>Podes comprar ${req.session.user}</h1> <a href="/logout">Logout</a> `);;
});


app.listen(8080);