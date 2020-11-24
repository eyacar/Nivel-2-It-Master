// npm install --save express mongodb
const express = require('express');
require('dotenv').config()
const	app = express();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.url;

app.get('/', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("TV");  
    var r = ""; 		
    dbo.collection("shows").find().forEach((data) => {   		
            r += `<li><a href="/serie/${data.id}">${data.titulo}</a></li>`;  		
        }, ()=>{  	
          res.send("<header><h1>Shows:</h1></header><ul>" + r + "</ul>");			
      });
  });	
  });	

  app.get('/serie/:id', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("TV");  
    var id = parseInt(req.params.id);
    dbo.collection("shows").findOne({"id":id}, function(err, data) {
if (err) throw err;
if(data){
if (data.cast.length>0){
    var reparto = ''
    for (r of data.cast){ reparto += `<li>${r}</li>`}
    res.send(`<header><h1><u>${data.titulo}</u></h1></header>
            <h2>Datos:</h2>
            <ul><li>Año: ${data.year}</li>
            <li>
            Cast:
            <ol>${reparto}</ol>
            </li>
            <li>Pais: ${data.country}</li></ul>
            <a href="/">Home</a>`);}
            else {
                res.send(`<header><h1>Show</h1></header>
                <h1><u>${data.titulo}</u></h1>
                <h2>Datos:</h2>
                <ul><li>Año: ${data.year}</li>
                <li>
                Cast: No hay datos
                </li>
                <li>Pais: ${data.country}</li></ul>
                <a href="/">Home</a>`);}

        }
        else{
            res.send("No encontrado");
        }
        
        db.close();
        });
      });
  });	
app.listen(8080);