const http = require('http');
var request = require("request");
var url = "https://jsonplaceholder.typicode.com/users/";
var Cantidad = 0
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
		request({
		    url: url,
		    json: true
		}, function (error, response, j) {
            if (!error && response.statusCode === 200) {
            j.sort( (a,b) =>  a.name.localeCompare(b.name))
                res.write(`<h1><u>Usuarios</u></h1> <ul>`)
                for(user of j){
		        res.write(`<li>Nombre: ${user.name}</li>`);
		        Cantidad++
            }
            res.write(`</ul>`)
            res.write(`<h2>Cantidad de usuarios: ${Cantidad}</h2>`);
            res.end();}
            else{
                res.write("Error");
                res.end();
            }
		})
}).listen(8080);