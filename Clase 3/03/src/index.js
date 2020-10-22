import React, { useState,useEffect,useRef }  from "react";
import ReactDOM from "react-dom";
import './index.css'


const App = () =>{ 
const [tipoCambio, SetCambio] = useState();
const [Cambiando, SetCambiando] = useState();
const [tipoCambio2, SetCambio2] = useState();
const Valor = useRef();
const Valor2 = useRef();
const Cambiar = useRef();

const Acambiar= ()=>{SetCambiando(Cambiar.current.value);SetCambio(Valor.current.value);SetCambio2(Valor2.current.value);document.getElementById("form").reset();};

const Calculo = () => {
  const [users, setUsers] = useState([]);
  
  function getUsers() {
      fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(users => {setUsers(users)})
        .catch(err => console.log(err.message))
    }
  
    useEffect(() => {
      getUsers()
    }, [])
    return (  
        <>
        {users.map( (co)=>{
          if (co.casa.nombre === 'Dolar Oficial' && parseInt(tipoCambio)===1 && parseInt(tipoCambio2)===1 && Cambiando.length >0){
          return (<><p>${(parseFloat(Cambiando.replace(',', '.'))*parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)} <br/><span>"Al Valor de Venta del Banco"</span></p><p>${(parseFloat(Cambiando)*parseFloat(co.casa.compra.replace(',', '.'))).toFixed(2)} <br/><span>"Al Valor de Compra del Banco"</span></p></>)}
        
          if (co.casa.nombre === 'Dolar Oficial' && parseInt(tipoCambio)===1 && parseInt(tipoCambio2)===2 && Cambiando.length >0){
            return (<p>U$S{(parseFloat(Cambiando.replace(',', '.'))/parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)} </p>)}
        
          if (co.casa.nombre === 'Dolar Blue' && parseInt(tipoCambio)===2 && parseInt(tipoCambio2)===1 && Cambiando.length >0){
              return (<><p>${(parseFloat(Cambiando.replace(',', '.'))*parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)}<br/><span>"Al Valor de Venta del Banco"</span></p><p>${(parseFloat(Cambiando)*parseFloat(co.casa.compra.replace(',', '.'))).toFixed(2)} <br/><span>"Al Valor de Compra del Banco"</span></p></>)}
            
          if (co.casa.nombre === 'Dolar Blue' && parseInt(tipoCambio)===2 && parseInt(tipoCambio2)===2 && Cambiando.length >0){
                return (<p>U$S{(parseFloat(Cambiando.replace(',', '.'))/parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)} </p>)}
            
        
        }  
        )  
        }
        </> 
    )
  };

return(
<div id='contenedor'>
<h1>Cuanto vale su plata?</h1>
<form id="form">
<input type="text" name="" id="" ref={Cambiar}/>
<label> Elija el Valor del tipo de cambio de referencia:</label>
<select id="" ref={Valor}>
<option value="0" selected >Elegir...</option>
<option value="1">Dolar Oficial</option>
<option value="2">Dolar Blue</option>  
</select>
<label> Elija la moneda que quiere cambiar:</label>
<select id="" ref={Valor2}>
<option value="0" selected >Elegir...</option>
<option value="1">Dolares a pesos</option>
<option value="2">Pesos a dolares</option>  
</select>
<input type="button" value="Valor" onClick={Acambiar}/> 
</form>
<Calculo/>
</div>
)};

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />,
  rootElement
);