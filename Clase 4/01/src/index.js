import React, { useState,useEffect}  from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Switch,Route,Link,useParams} from "react-router-dom";
import './index.css'

const Paises =()=>{
const [lista, Setlista] = useState([]);
const GetLista = ()=> {
  fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json')
      .then(response => response.json())
      .then(paises => {Setlista(paises);})
      .catch(err => console.log(err.message))
}

useEffect(()=>{
GetLista();
// eslint-disable-next-line react-hooks/exhaustive-deps 
},[])
const key = Object.keys(lista)
return(<ul>{key.filter(pais => pais[0].toUpperCase() ==='A').map((pais,i) => <Link to={'/pais/'+pais} key={i}><li>{pais}</li></Link>)}</ul>)
};

const Pais = () => {
  const [country, Setcountry] = useState([]);
  const params = useParams();
  const GetPais = ()=> {
    fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json')
        .then(response => response.json())
        .then(pais => {Setcountry(pais);})
        .catch(err => console.log(err.message))
  }
  useEffect(()=>{
  GetPais();
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[])





return (<><h2>Ciudades:<ul>{country[params.id]? country[params.id].map((pais,i) => <li>{pais}</li>):null}</ul></h2><Link to='/'>Regresa a la Home</Link></>)
};


const App = () =>(
<Router>
<h1>Paises Con A:</h1>
<Switch>
<Route exact path="/"><Paises/></Route>
<Route exact path="/pais/:id"><Pais/></Route>
</Switch>
</Router>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />,rootElement);