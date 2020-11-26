var express = require('express');
const nunjucks = require('nunjucks');
var bodyParser = require('body-parser')
require('dotenv').config()
var	app = express();

session = require('express-session');
app.use(session({
    secret: 'elSecreto',
    name: 'sessionId',
    proxy: true,
    resave: true,
    saveUninitialized: true ,
    cookie: { maxAge: 24 * 60 * 60 * 1000  }  
  }));  

const path = require('path');
app.use('/public', express.static(path.join(__dirname + '/public')));

nunjucks.configure(path.join(__dirname + '/views/'), {
  autoescape: false,
  express: app
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.url;

app.get('/', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db('menu');  
    var categorias = "";
    dbo.collection('categorias').find().forEach((datos) => {   		
        categorias += `<li style="margin-top: 3%;" ><a style=" text-decoration: none;" href="/categoria/${datos.categoria.replace(' ', '_')}">${datos.categoria}</a></li>`;
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
                "platos.id":1     
                }}
        ]).toArray(function(err, data) {
        if (err) throw err;
        res.render('categoria.html',{data:data, categoria:req.params.categoria});
        db.close();
        });
        });
	
});



// Opción de la ruta /categoria/:categoria sin lookup
/* 
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


app.get('/comida/:id', (req, res)=>{	  
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
        res.render('comida.html',{categorias:categorias, platos:platos, id:parseFloat(req.params.id)});
            });
        });
      });
    });


const admin = process.env.admin_user
const adminPass = process.env.admin_pass

app.all('/alta', (req, res)=>{
MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
        const dbo = db.db("menu");  
        var select = "";
        dbo.collection("categorias").find().forEach((categorias) => {   		
            select += `<option value="${categorias.id}">${categorias.categoria}</option>`;
        }, ()=>{
        res.render('alta.html',{log:req.session.login,select:select});
            });
        });
if(req.body.user === admin && req.body.pass === adminPass){req.session.login = true}

});

app.get('/logout', function (req, res) {
    req.session.destroy();
    var logout = `<h1>Sesion cerrada!</h1>`;
    res.render('logout.html', {logout:logout})
  });
  
app.all('/add', function (req, res) {
if(req.body.plato && req.body.descripcion && req.body.categoria && req.body.precio){

    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
        const dbo = db.db('menu');  
        var i = 0;
        dbo.collection('platos').find().forEach((datos) => {   		
            i++;
        }, ()=>{
            dbo.collection("platos").insertOne(
                {
                id:i,
                plato: req.body.plato,
                descripcion: req.body.descripcion, 
                precio: parseInt(req.body.precio),
                IDcategoría: parseInt(req.body.categoria)
                },
                function (err, res) {
                    db.close();
                    if (err) {              
                      return console.log(err);    
                    }
                })
                res.render('add.html',{mensaje:"Alta exitosa de "+req.body.plato});
            });
        });
    }

else{
res.render('add.html',{});};

});


app.listen(8080);