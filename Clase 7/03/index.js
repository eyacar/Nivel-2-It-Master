const http = require('http');
var request = require("request");
var url = "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json";
var Continente = []
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
		request({
		    url: url,
		    json: true
		}, function (error, response, j) {
            if (!error && response.statusCode === 200) {
            for(a of j){
            if (!(Continente.includes(a.continent))){Continente.push(a.continent)
            }
            }
            res.write(`<table>`)
            for (c of Continente){
                
                res.write(`<tr><th>${c}</th><tr>`)
                for(a of j){
                if (a.continent === c) {res.write(`<tr><td>${a.country}</td></tr>`)}
                }}res.write(`</table>`)
            res.end();}
            else{
                res.write("Error");
                res.end();
            }
		})
}).listen(8080);