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
  fetch('https://raw.githubusercontent.com/algolia/datasets/master/movies/actors.json')
  .then(response => response.json())
  .then(actores => res.render(
  'index.html',{actores:actores,}))    
});

app.get('/actor/:id', function(req, res) {
  fetch('https://raw.githubusercontent.com/algolia/datasets/master/movies/actors.json')
  .then(response => response.json())
  .then(actores => res.render(
  'actor.html',{actores:actores, id:req.params.id}))    
});

app.listen(8080);