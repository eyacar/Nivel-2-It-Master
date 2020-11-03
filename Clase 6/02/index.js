const nombres = ['Andrés', 'Carlos', 'Liliana', 'Soledad', 'Ana', 'Carolina', 'Magdalena', 'Silvia', 'Marcos', 'Elena', 'Carla', 'Antonio'];
const letras =['A','B','C']
var n = ''
var n1 = ''

for (nombre of nombres){
for (i in letras){
if (nombre[0].toUpperCase().includes(letras[i].toUpperCase())===true){console.log(nombre);n1 = n1 + nombre + "+"}}

n = n + nombre + "+"
}
console.log(n.slice(0,-1))
console.log(n1.slice(0,-1))


