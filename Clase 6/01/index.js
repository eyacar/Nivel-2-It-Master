const nombres = ['Ezequiel','Noelia','Damian','Lucas','Roberto'];
var n = ''
for (nombre of nombres){
   n = n + nombre + "*"  
}
console.log(n.slice(0,-1))
console.log("Total de nombre: "+nombres.length)

