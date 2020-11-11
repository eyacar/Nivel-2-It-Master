var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var destinos = [{"destino":"Brasil","precio":"500"},{"destino":"Francia","precio":"1200"},{"destino":"Alemania","precio":"1350"},{"destino":"Noruega","precio":"1500"}];


app.get("/", (req, res) => {
var acumula = ''
for (destino of destinos){ acumula += `<option value="${destino.destino}">${destino.destino}</option>`}
res.status(200).send(
      `<form method="post" action="/cotizacion">      
      <input type="text" name="user" placeholder="Usuario..." required>
      <select name="destinos" id="select">
      <option value="">Elegir...</option>
      ${acumula}
      </select>
      <input type="number" name="cantidad" required>
      <input type="submit" value="Buy">
    </form>`
    );
    });

app.post("/cotizacion", (req, res) => {
for (destino of destinos){
if (req.body.destinos === destino.destino){
      res.status(200).send(
        `<h2>Usuario: ${req.body.user}</h2>
        <h2>Destino: ${req.body.destinos}</h2>
        <h2>Valor: ${req.body.cantidad * destino.precio}</h2>
        <a href="/">Volver</a>
        `
      )}};
          });
      

app.listen(8080);