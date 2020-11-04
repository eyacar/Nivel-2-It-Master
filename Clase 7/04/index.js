const http = require('http');
var request = require("request");
var url = "https://gist.githubusercontent.com/mariodev12/a923f2b651a005ca3ca7f851141efcbc/raw/39b06a32e4a58fc1fe63c7478a97edccd21138f1/superheroes.json";
var publisher = []
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
		request({
		    url: url,
		    json: true
		}, function (error, response, j) {
            if (!error && response.statusCode === 200) {
            for(editoriales of j){
            if (!(publisher.includes(editoriales.publisher))){publisher.push(editoriales.publisher)}
            }
            res.write(`<table>`)
            for (shero of publisher){
                res.write(`<tr><th>${shero}</th></tr>`)
            for (s of j){if(shero===s.publisher){res.write(`<tr><td>${s.superhero}</td></tr>`)}}
            }
            res.write(`</table>`)
            res.end();}
            else{
                res.write("Error");
                res.end();
            }
		})
}).listen(8080);