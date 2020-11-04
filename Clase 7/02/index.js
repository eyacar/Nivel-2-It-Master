const http = require('http');
var request = require("request");
var url = "https://raw.githubusercontent.com/dweinberger/Oscars.JSON/master/oscars.json.2016/oscars2016.json";
var Cantidad = 0
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
		request({
		    url: url,
		    json: true
		}, function (error, response, j) {
            if (!error && response.statusCode === 200) {
            res.write(`<h1 style="color:blue;"><u>Ceremonia de los Oscar</u>: ${j.year_of_awards}</h1><h2>Los nominados a Best Picture son:</h2> <ul>`)
            for(j of j.nominations){
            if(j.category.category_name === "Best Picture"){
            for(j of j.category.nominees){
                res.write(`<li>${j.title}</li>`);Cantidad++}}}
            res.write(`</ul>`)
            res.write(`<h2>Cantidad de Peliculas nominadas: ${Cantidad}</h2>`);
            res.end();}
            else{
                res.write("Error");
                res.end();
            }
		})
}).listen(8080);
