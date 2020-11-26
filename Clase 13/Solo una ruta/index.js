var express = require('express');
const nunjucks = require('nunjucks');
var bodyParser = require('body-parser')
require('dotenv').config()
var	app = express();

const path = require('path');
app.use('/public', express.static(path.join(__dirname + '/public')));

nunjucks.configure(path.join(__dirname + '/views/'), {
  autoescape: false,
  express: app
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb+srv://eze:1234@cluster0.jeaj7.mongodb.net/menu?retryWrites=true&w=majority';

app.get('/', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db('menu');  
    var categorias = "";
    dbo.collection('categorias').find().forEach((datos) => {   		
        categorias += `<li style="margin-top: 3%;" ><a style=" text-decoration: none;" href="/categoria/${datos.categoria}">${datos.categoria}</a></li>`;
    }, ()=>{
        res.render('index.html',{categorias:categorias});
    });
  });
});

// La ruta /categoria/:categoria hecha con lookup
app.get('/categoria/:categoria', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("menu");
        dbo.collection('categorias').aggregate([
            { $lookup:
                {
                from: 'platos',
                localField: 'id',
                foreignField: 'IDcategoría',
                as: 'platos'
                }
                },
            {$unwind:'$platos'},
                {$project:{            
                "_id": 0,
                "categoria": 1,
                "platos.plato":1,
                "platos.descripcion":1,
                "platos.imagen":1,  
                "platos.precio":1,     
                }}
        ]).toArray(function(err, data) {
        if (err) throw err;
        res.render('categoria.html',{data:data, categoria:req.params.categoria});
        db.close();
        });
        });
	
});


/* 
// Opción de la ruta /categoria/:categoria sin lookup

app.get('/categoria/:categoria', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db('menu');  
    var categorias = [];
    var platos = [];
    dbo.collection('categorias').find().forEach((datos) => {   		
        categorias.push({categoria:datos.categoria, id:datos.id});
    }, ()=>{
        dbo.collection('platos').find().forEach((listaplatos) => {   		
            platos.push(listaplatos);
        }, ()=>{
    res.render('categoria.html',{categorias:categorias, platos:platos, categoria:req.params.categoria});
        });
    });
  });
}); */



app.all('/alta', (req, res)=>{
  if(req.body.nombre && req.body.edad)
  {
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("testdb")
    dbo.collection("personajesdark").insertOne(
        {
            nombre: req.body.nombre,
            edad: parseInt(req.body.edad)
        },
        function (err, res) {
            db.close();
            if (err) {              
              return console.log(err);    
            }
        })
        res.render('alta.html',{mensaje:"Alta exitosa de "+req.body.nombre});        
    })
  }
  else{
    res.render('alta.html');      
  }
})

app.get('/buscador', (req, res)=>{	  
  //Obtenemos el valor del término de búsqueda
  var termino = req.query.busqueda;  
  // Creamos la expresión regular para poder verificar que contenga el término el nombre en la base de datos. La i significa no sensible a may/min
  var expresiontermino = new RegExp(termino,"i");
  MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
  const dbo = db.db("testdb");    
  dbo.collection("personajesdark").find({"nombre":{$regex: expresiontermino }}).toArray(function(err, data) {	      
      res.render('buscador.html',{termino:termino,data:data});
	});
});	
});	
app.listen(8080);

