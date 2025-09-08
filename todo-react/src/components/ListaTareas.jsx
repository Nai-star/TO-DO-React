import { useState } from 'react'
import  './listaTareas.css'

function ListaTareas() {

 const [tarea,setTarea] = useState ("")
    function ObtenerDatos() {
        console.log(tarea);
        
        
    }


  return (
    <div>
        <div>
         <p id='footerArriba'>TO-DO Nai</p>
            <h1>Tareas por completar</h1>
            <label htmlFor="Tarea"></label>
            <input type="text"  placeholder='Ingrese una Tarea' value={tarea} onChange={(e)=>setTarea (e.target.value)}/>
            <button onClick={ObtenerDatos}>Agregar</button>
            <div id='contenedorTareas'></div>
            <p id='footerAbajo'>TO-DO Nai</p>
        </div>
      
    </div>
  )
}

export default ListaTareas
