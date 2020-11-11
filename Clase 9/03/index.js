// npm install --save express nunjucks node-fetch
const express = require('express');
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');
const app = express();
app.use(express.static('public'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
  fetch('https://www.googleapis.com/books/v1/volumes?q=node.js')
  .then(response => response.json())
  .then(libros => res.render(
  'index.html',{libros:libros,}))    
});

app.get('/libro/:id', function(req, res) {
  const remplazar = 
  fetch('https://www.googleapis.com/books/v1/volumes/'+ req.params.id)
  .then(response => response.json())
  .then(libro => res.render(
  'libro.html',{libro:libro, descripcion:libro.volumeInfo.description}))    
});

app.listen(8080);