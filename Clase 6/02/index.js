const nombres = ['Andrés', 'Carlos', 'Liliana', 'Soledad', 'Ana', 'Carolina', 'Magdalena', 'Silvia', 'Marcos', 'Elena', 'Carla', 'Antonio'];
const letras =['A','B','C']
var n = ''
var n1 = ''

for (nombre of nombres){
if (nombre[0].toUpperCase().includes(letras[0])===true){console.log(nombre)}
if (nombre[0].toUpperCase().includes(letras[1])===true){console.log(nombre)}
if (nombre[0].toUpperCase().includes(letras[2])===true){console.log(nombre)}
if (nombre[0].toUpperCase().includes(letras[0])===true || nombre[0].toUpperCase().includes(letras[1])===true || nombre[0].toUpperCase().includes(letras[2])===true){n1 = n1 + nombre + "+"}  
n = n + nombre + "+"
}
console.log(n.slice(0,-1))
console.log(n1.slice(0,-1))

