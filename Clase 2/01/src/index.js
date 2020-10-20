import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import './index.css'

const Style = {
  marginTop: '2%'
}

const App =()=>{
const textName = useRef();
const [Fname, SetName]= useState();

const Validar = () =>{
SetName(textName.current.value)
}

return (
<>
<form action=""  style={Style}>
<input type="text" style={Style} ref={textName} placeholder="Escriba un texto..."/>
<input type="button" value="Validar" onClick={Validar}/> 
</form>
<br/>
<div id="div" style={Style}>
<p>{Fname && !isNaN(Fname)? <strong>Es numero? Si</strong>:null}</p>
<p>{Fname && isNaN(Fname)? <strong>Es numero? No</strong>:null}</p>
<p>{!isNaN(Fname) && Fname % 1 ===0? <strong>Es entero? Si</strong>:null}</p>
<p>{Fname && !isNaN(Fname) && Fname % 1 !==0? <strong>Es entero? No</strong>:null}</p>
<p>{!isNaN(Fname) && Fname % 2 ===0? <strong>Es par? Si</strong>:null}</p>
<p>{Fname && !isNaN(Fname) && Fname % 2 !==0? <strong>Es par? No</strong>:null}</p>
<p>{!isNaN(Fname) && Fname>=0? <strong>Es positivo? Si</strong>:null}</p>
<p>{Fname && !isNaN(Fname) && Fname<0? <strong>Es positivo? No</strong>:null}</p>
</div> 
</>
)}

ReactDOM.render(<App />,document.getElementById('root'));

