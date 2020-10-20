import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import './index.css'
import swal from 'sweetalert';


const Style = {
  display: 'block',
  marginTop: '2%'
}

const App =()=>{
const cotizaciones = [{'damicoins':0.1}, {'damicripy':5.2},{'coindamis':88.5}];
const option = ['damicoins','damicripy','coindamis']; 
const Select = cotizaciones.map((op,i) => <option value={i+1}>{option[i]}</option>)
 
const textNumber = useRef();
const criptoMoneda = useRef();
const [Fnumber, SetName]= useState();
const [Fcripto, SetCripto]= useState();
const [Valor, SetValor]= useState();
const [Resultado, Setvar]= useState();

const Values = () =>{SetCripto(criptoMoneda.current.value);SetName(textNumber.current.value);}

const Validar = () =>{
  if(Fnumber && !isNaN(Fnumber) && Fcripto>0){
  Setvar(true)
  if(Fcripto==1){
    let v=cotizaciones[0].damicoins
    const resultado = Fnumber*v
    SetValor(resultado)}   
  if(Fcripto==2){
    let v=cotizaciones[1].damicripy
    const resultado1 = Fnumber*v
    SetValor(resultado1)}   
  
  if(Fcripto==3){
    let v=cotizaciones[2].coindamis
    const resultado2 = Fnumber*v
    SetValor(resultado2)}   
}
else{
  const error = "ERROR EN DATOS"
  SetValor(error)
  Setvar(false)
  swal({
    text: "ERROR EN DATOS",
  });
}
}
return (
<>
<form style={Style} onChange={Values}>
<input type="text" style={Style} ref={textNumber} placeholder="Escriba el valor a cotizar..." onChange={Values}/>
<select name="select" style={Style} ref={criptoMoneda}>
<option value="0">Elegir...</option>
{Select}
</select>
<input type="button" style={Style} value="Calcular" onClick={Validar}/> 
</form>
<br/>
<div id="div" >
<p><strong className={Resultado===false? 'error':null}>{Resultado?<span>Resultado:</span>:null} {Valor}</strong></p>
</div> 
</>
)}

ReactDOM.render(<App />,document.getElementById('root'));

