import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import './index.css'

const Style = {
  marginTop: '2%'
}

const App =()=>{
const textName = useRef();
const [Fname, SetName]= useState();
const textlastname = useRef();
const [Flastname, SetLastname]= useState();
const textNumber = useRef();
const [Fnumber, SetNumber]= useState();
const textBday = useRef();
const [Fbday, SetBday]= useState();
const textCountry = useRef();
const [Fcountry, SetCountry]= useState()

const Mostrar = () =>{
  SetName(textName.current.value)
  SetLastname(textlastname.current.value)
  SetNumber(textNumber.current.value)
  SetBday(textBday.current.value)
  SetCountry(textCountry.current.value)
}
return (
<>
<form action=""  style={Style}>
  <input type="text" style={Style} ref={textName} placeholder="Nombre..."/>
  <br/>
  <input type="text" style={Style} ref={textlastname} placeholder="Apellido..."/>
  <br/>
  <label style={Style}>Elegi un numero</label>
  <br/>
  <input type="number" ref={textNumber} min="1" max="10"/>
  {Fnumber>10 || Fnumber<=0? <p id='error'>Debe elegir un numero entre el 1 y el 10</p>:null}
  <br/>
  <label style={Style}>Birthday</label>
  <br/>
  <input type="date" ref={textBday} min="1970-01-01" max="2090-12-31" />
  <br/>
  <select name="select" ref={textCountry} style={Style}>
  <option value="0" selected>Elegir...</option> 
  <option value="Argentina" >Argentina</option>
  <option value="Brasil">Brasil</option>
  <option value="Chile">Chile</option>
  <option value="Peru">Peru</option>
  </select>
  <br/>
  <input type="button" onClick={Mostrar} value="Agregar" style={Style}/>
</form>
<div id="div" style={Style}>
{Fname? <p>Nombre: {Fname}</p>:null}
{Flastname? <p>Apellido: {Flastname}</p>:null}
{Fnumber && Fnumber >0 && Fnumber <11 ? <p>Numero elegido: {Fnumber}</p>:null}
{Fbday? <p>Cumpleaños: {Fbday}</p>:null}
{Fcountry && Fcountry!=0? <p>Pais: {Fcountry}</p>:null}
</div> 
</>
)}

ReactDOM.render(<App />,document.getElementById('root'));

