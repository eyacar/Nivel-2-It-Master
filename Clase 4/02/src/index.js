import React, { useState,useEffect}  from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Switch,Route,Link,useParams} from "react-router-dom";
import './index.css'

const Libros =()=>{
const [lista, Setlista] = useState([]);
const [search , SetSearch] = useState('');
const GetLista = ()=> {
  fetch('https://raw.githubusercontent.com/bvaughn/infinite-list-reflow-examples/master/books.json')
      .then(response => response.json())
      .then(paises => {Setlista(paises);})
      .catch(err => console.log(err.message))
}

const Buscando =(event)=>{SetSearch(event.target.value);}

useEffect(()=>{
GetLista();
// eslint-disable-next-line react-hooks/exhaustive-deps 
},[])

const p = search.length

return(
<>
<input type="search" name="" id="" placeholder='Search...' onChange={Buscando}/>
{search? 
<ul>{
lista.filter(libro => libro.title.slice(0,p).toLowerCase() === search.toLowerCase()).map((libro,i) => <Link to={'/pais/'+libro.isbn} key={i}><li>{libro.title}</li></Link>)} </ul>:
<ul>{lista.map((libro,i) => <Link to={'/pais/'+libro.isbn} key={i}><li>{libro.title}</li></Link>)}</ul>
}
</>
)};

const Libro = () => {
  const [Datos, SetDatos] = useState([]);
  const params = useParams();
  const GetLibro = ()=> {
    fetch('https://raw.githubusercontent.com/bvaughn/infinite-list-reflow-examples/master/books.json')
        .then(response => response.json())
        .then(dato => {SetDatos(dato);})
        .catch(err => console.log(err.message))
  }
  useEffect(()=>{
  GetLibro();
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[])


return (
<div id="elegido">
<h2><u>Elegido</u></h2>
{Datos?
Datos.filter(libro => libro.isbn===params.id).map((libro,i)=><ul><li><span className='titulos'>Titulo: </span>{libro.title}</li><li><span className='titulos'>Codigo del libro: </span>{libro.isbn}</li><li><span className='titulos'>Cantidad de paginas: </span>{libro.pageCount}</li><li><span className='titulos'>Tapa: </span><br/><br/> <img src={libro.thumbnailUrl} alt="Tapa"/></li><li><span className='titulos'>Descripción: </span>{libro.longDescription}</li><li><span className='titulos'>Autor: </span>{libro.authors}</li><li><span className='titulos'>Categoria: </span>{libro.categories}</li></ul>)
:<img src="https://images.vectorhq.com/images/previews/8da/preload-gif-animated-freebies-83609.gif" alt=""/>}

<Link to='/' id='ancor'><input type="button" value="Regresa a la Home"/></Link>
</div>)
};


const App = () =>{

return(
<Router>
<h1><u><em>Buscador de libros</em></u></h1>
<Switch>
<Route exact path="/"><Libros/></Route>
<Route exact path="/pais/:id"><Libro/></Route>
</Switch>
</Router>
)};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />,rootElement);