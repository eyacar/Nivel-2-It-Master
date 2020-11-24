// Ejecutar node insertdb.js para insertar en la base de datos primero
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.url;

const shows = ['Under the Dome','Fargo','American Horror Story','Person of Interest','Arrow','True Detective','Game of Thrones']

function cast(id){
const reparto = []
  fetch(`http://api.tvmaze.com/shows/${id}/cast`)
  .then(response => response.json())
  .then(showcast => {
  for (personaje of showcast){
    reparto.push(personaje.person.name)
  }
  })
return reparto
};

    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("TV");  

  fetch('http://api.tvmaze.com/shows')
  .then(response => response.json())
  .then(tvshow => {
  for (show of tvshow){
    for(i in shows){
    if (show.name === shows[i]){
    dbo.collection("shows").insertOne(
        {
          id: parseFloat(i)+1,
          titulo: show.name,
          year: parseFloat(show.premiered.slice(0,4)),
          cast: cast(parseFloat(show.id)),
          country: show.network.country.name
        },
        function (err, res) {
          if (err) {
            db.close();
            return console.log(err);
          }
          else{
            console.log("La info se ha insertado con exito")
          }
        }
      )}
    }}
    })
});

setTimeout((function() {
  return process.exit(22);
}), 50000)



