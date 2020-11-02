import React  from 'react';
import useFetch from "./useFetch";
import ReactDOM from "react-dom";
import './index.css'


const App = () =>{ 
const products = useFetch('https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json')
return(
<>
{products.filter(producto => producto.price > 15).map((producto,i)=> <ul key={i}><li>{producto.title}</li><li>{producto.description}</li><li>{producto.price}</li> </ul>)}
</>
)};

ReactDOM.render((<App />), document.getElementById('root'));
