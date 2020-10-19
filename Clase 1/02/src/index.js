import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import './index.css'

const Style = {
  marginTop: '2%'
}

const App =()=>{
const textName = useRef();
const [Fname, SetName]= useState();
const Mostrar = () =>{
  SetName(textName.current.value)
}
return (
<>
<form action=""  style={Style}>
  <input type="text" style={Style} ref={textName} onChange={Mostrar} placeholder="Escriba un texto..."/>
</form>
<br/>
<div id="div" style={Style}>
{Fname && Fname.length <=20? <p>Nombre: {Fname}</p>:null}
{Fname && Fname.length>20? <p id="error">El texto no debe superar los 20 caracteres</p>:null}
</div> 
</>
)}

ReactDOM.render(<App />,document.getElementById('root'));

