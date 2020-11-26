// Ejecutar node insertdb.js para insertar en la base de datos primero
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.url;

const shows = ['Under the Dome','Fargo','American Horror Story','Person of Interest','Arrow','True Detective','Game of Thrones']

fetch(`http://api.tvmaze.com/shows/1/cast`)
    .then(response => response.json())
    .then(showcast => {
    r =''
      for (personaje of showcast){
      r += personaje.person.name
    }
return console.log(r)
})

const datos = []

fetch('http://api.tvmaze.com/shows')
  .then(response => response.json())
  .then(tvshow => {
for (show of tvshow){
for (i in shows){
if (show.name === shows[i]){ 
  datos.push({
    id: parseFloat(i)+1,
    titulo: show.name,
    year: parseFloat(show.premiered.slice(0,4)),
    
    country: show.network.country.name
  })
}
  }}
console.log(datos)
}
) 
