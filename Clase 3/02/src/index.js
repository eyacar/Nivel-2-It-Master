import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import './index.css';

const Usuario = () => {
  const [users, setUser] = useState( [] )
  let params = useParams();
  const getUser = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/'+params.id)
      .then(response => response.json())
      .then(user => {setUser(user);})
      .catch(err => console.log(err.message))
  }
  useEffect(() => { getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])
      return (  
      <section>
        <h5>Tarea numero: <span>{params.id}</span></h5>
        <h5>Titulo: <span>{users.title}</span></h5>
        <h5>Completada? <span>{users.completed === true?'Si':'No'}</span></h5>
        
        <p><Link to="/" style={{color:'brown',fontSize:'30px'}}>Regresar a la home</Link></p>
      </section>
    
  )
}

const Lista = () => {
  const [user, setUser] = useState([])
  const getUser =() =>{
    fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then(data => {setUser(data)})
          .catch(err => console.log(err.message))
  }
useEffect(() => { 
// eslint-disable-next-line react-hooks/exhaustive-deps 
getUser()
}, [])  
return (
<>{user.filter(id=> parseFloat(id.userId)===8).map((id,i) =>
<h4 key={i}> <Link to={"/tarea/"+id.id}>To do: {id.id} -- Clompletado:{id.completed===true?' 🟢':' 🔴'}</Link></h4>)}
</>)
}


const  App = () => (    
<Router>
<h1>Tareas del Usuario 8:</h1>
<Switch>
<Route exact path="/"><Lista/></Route>
<Route path="/tarea/:id"><Usuario/></Route>
</Switch>
</Router>
);


ReactDOM.render(<App />,document.getElementById('root'));

