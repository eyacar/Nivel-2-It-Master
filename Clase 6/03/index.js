const notas = [{"Pedro":{
   "Matematica": 10,
   "Geografia": 6,
   "Historia": 9}
   },
   {"Juana":{
   "Matematica": 5,
   "Geografia": 10,
   "Historia": 7}
   }]
   
const Alumno1 = Object.keys(notas[0]) 
const Materias1 = Object.keys(notas[0][Alumno1])
const Promedios1 = Object.values(notas[0][Alumno1])
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const Total = Promedios1.reduce(reducer)/Promedios1.length

console.log('El promedio total de "'+ Alumno1+'"es '+Total)

console.log('La Materia con mayor promedio de "'+ Alumno1+'"es '+Materias1[Promedios1.indexOf(Math.max.apply(null, Promedios1))]+': '+ Math.max.apply(null, Promedios1))


const Alumno2 = Object.keys(notas[1]) 
const Materias2 = Object.keys(notas[1][Alumno2])
const Promedios2 = Object.values(notas[1][Alumno2])


console.log('La Materia con mayor promedio de "'+ Alumno2+'"es '+Materias2[Promedios2.indexOf(Math.max.apply(null, Promedios2))]+': '+ Math.max.apply(null, Promedios2))
