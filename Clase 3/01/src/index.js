import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';

const  App = () => {
  const [user, setUser] = useState([])
  const [compania, setCompania] = useState([])
  
const getUser =() =>{
  fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {setUser(data); setCompania(data.company)})
        .catch(err => console.log(err.message))
}
  useEffect(() => { 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  getUser()
}, [])

return (  
<section style={{color:'red'}}>
{user.filter(id=> id.name[0]==='C').map((id,i) => 
<>
<h4 key={i}>Nombre: {id.name}</h4>
<h4>Email: {id.email}</h4>
<h4>Web: {id.website}</h4> 
<h4>Nombre de la Compañia: {id.company.name} </h4>
<h4>Eslogan: {id.company.catchPhrase} </h4>
<br/>
</>)
}
</section>
)
};


ReactDOM.render(<App />,document.getElementById('root'));

