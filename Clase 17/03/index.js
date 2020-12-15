var express = require('express');
const fetch = require('node-fetch');
const nunjucks = require('nunjucks');

var	app = express();

const path = require('path');
nunjucks.configure(path.join(__dirname + '/views/'), {
	autoescape: false,
	express: app
  });
app.use('/public', express.static(path.join(__dirname + '/public')));

//https://www.npmjs.com/package/is-mobile is-mobile@1.0.0
const mobile = require('is-mobile');

app.get('/', function(req, res){
console.log(mobile(req))
if(mobile(req)){
fetch('https://jsonplaceholder.typicode.com/photos')
.then(response => response.json())
.then(data =>{
var foto = ''
for (i in data){
if (i < 10){
foto += `<li><img src="${data[i].thumbnailUrl}" style="width:100%">
<span>${data[i].title}</span>
</li>`    
}}
res.render('mobile.html',{picture:foto});
});	
	}
else{
	fetch('https://jsonplaceholder.typicode.com/photos')
	.then(response => response.json())
	.then(data =>{ 
	var foto = ''
	for (i in data){
	if (i < 10){
	if(i==0){foto += `<img id="img1" src="${data[i].url}">`}
	else{foto += `<img src="${data[i].url}">`}}}
	res.render('desktop.html',{picture:foto});
});}
});

app.listen(8080, function(){
		console.log("Escuchando en el puerto 8080");
	});
