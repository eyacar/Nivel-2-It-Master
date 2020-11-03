const array = [
   {"Equipo": "Barcelona", "PG": 22, "PE": 7, "PP": 6, "GF": 49, "GC": 33,},
   {"Equipo": "Getafe", "PG": 14, "PE": 11, "PP": 9, "GF": 42, "GC": 31,},
   {"Equipo": "Real Sociedad", "PG": 15, "PE": 6, "PP": 13, "GF": 51, "GC": 43,},
   {"Equipo": "Atletico Madrid", "PG": 16, "PE": 15, "PP": 4, "GF": 47, "GC": 26,},
   {"Equipo": "Valencia", "PG": 13, "PE": 11, "PP": 11, "GF": 45, "GC": 51,},
   {"Equipo": "Villareal", "PG": 16, "PE": 6, "PP": 12, "GF": 54, "GC": 44,},
   {"Equipo": "Real Madrid", "PG": 23, "PE": 8, "PP": 3, "GF": 62, "GC": 21,},
   {"Equipo": "Sacachispas", "PG": 23, "PE": 8, "PP": 3, "GF": 59, "GC": 21,}
];

const puntajes =[]
const campeones =[]
const Goles =[]
const MejoresEquipos =[]
const MejorDif = []


for (equipos of array){
   const puntaje= (equipos.PG*3)+(equipos.PE*1)+(equipos.PP*0)
   puntajes.push(puntaje)
   const difGoles =equipos.GF - equipos.GC
   Goles.push(difGoles)
   console.log(equipos.Equipo+'| Puntaje:'+puntaje+' - Diferencia de goles:'+difGoles)
}
for (puntaje of puntajes){ if(Math.max.apply(null, puntajes)=== puntaje){campeones.push(puntaje)}}

if (campeones.length === 1){
   console.log('Campeon: '+array[puntajes.indexOf(Math.max.apply(null, puntajes))].Equipo+'| Puntos: '+Math.max.apply(null, puntajes))}
else{
   for(i in puntajes){
   if(puntajes[i]===campeones[0]){MejoresEquipos.push(array[i].Equipo);MejorDif.push(Goles[i])
   }}
}

console.log('EL equipo campeon es: '+MejoresEquipos[MejorDif.indexOf(Math.max.apply(null, MejorDif))])

