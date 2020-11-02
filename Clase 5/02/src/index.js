import React from 'react';
import useFetch from "./useFetch";
import ReactDOM from "react-dom";
import './index.css'


const App = () =>{ 
const precios = [0]
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const products = useFetch('https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json')

products.map(producto => precios.push(producto.price))

console.log(precios.reduce(reducer))

const Total = precios.reduce(reducer)

return(
<>
<h1>Precio total de los Productos:</h1>
<h2 style={{color:'red'}}>{Total}</h2>
</>
)};

ReactDOM.render((<App />), document.getElementById('root'));
