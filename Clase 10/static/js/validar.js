var morosos =  ['AAA-123','AAC-823','AA-134-CC']

function validar() {
var patente = document.formulario.patente.value
var year = document.formulario.year.value
var date = new Date();
var now = date. getFullYear();
var km = document.getElementById("km");
var mora = false

for (pat of morosos){if(pat.toLowerCase() === patente.toLowerCase()){mora=true}}

if (/^([a-z]{2}|[a-z]{3})(-)\d{3}?((-)[a-z]{2}|\b)$/i.test(patente) & mora === false & /^\d{4}$/.test(year) & year>=(now-20)  & year<=now & km.checkValidity()){
document.formulario.submit();}

}

function patentes(){
var patente = document.formulario.patente.value
var mora = false

for (pat of morosos){if(pat.toLowerCase() === patente.toLowerCase()){mora=true}}

if (!(/^([a-z]{2}|[a-z]{3})(-)\d{3}?((-)[a-z]{2}|\b)$/i.test(patente)) & mora === false){
document.getElementById('p').innerHTML = 'Debe contener 2 a 3 letras - 3 numeros y finalizar asi o - 2 letras'
}
else if (/^([a-z]{2}|[a-z]{3})(-)\d{3}?((-)[a-z]{2}|\b)$/i.test(patente) & mora === true){
    document.getElementById('p').innerHTML = 'Patente Morosa'
    }
else {document.getElementById('p').innerHTML = ''}
}
function years(){
var year = document.formulario.year.value
var date = new Date();
var now = date. getFullYear();
if(!(/^\d{4}$/.test(year)) || year<(now-20)  || year>now){
    document.getElementById('y').innerHTML = 'El año debe contar con 4 digitos y no ser superior a 20 años menos del actual, ni mayor al actual'}
else {document.getElementById('y').innerHTML = ''}
}
function kms(){
var km = document.getElementById("km");
if(!km.checkValidity()){
document.getElementById('k').innerHTML = 'El KM debe ser superior a 0'}
else{document.getElementById('k').innerHTML = ''}
}