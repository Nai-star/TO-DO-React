import { useState, useEffect } from 'react';
import servicios from '../../services/servicios';
import './listaTareas.css';

function ListaTareas() {
  const [tareaInput, setTareaInput] = useState('');
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const tareasTraidas = await servicios.getTareas();
        setTareas(tareasTraidas);
      } catch (error) {
        console.error("Error al traer las tareas", error);
      }
    };

    fetchTareas();
  }, []);

  const agregarTarea = async () => {
    if (tareaInput.trim() === "") return;

    const nuevaTarea = { id: Date.now(), texto: tareaInput };

    try {
      const tareaCreada = await servicios.postTareas(nuevaTarea);
      setTareas([...tareas, tareaCreada]);
      setTareaInput("");
    } catch (error) {
      console.error("Error al agregar la tarea", error);
    }
  };

  return (
    <div>
      <p id='footer'>TO-DO Nai</p>
      <h1>Tareas por completar</h1>

      <p id='contador'>Total de tareas: {tareas.length}</p>

      <input
        type="text"
        placeholder="Ingrese una Tarea"
        id='input'
        value={tareaInput}
        onChange={(e) => setTareaInput(e.target.value)}
      />
      <button onClick={agregarTarea}>Agregar</button>

      <div id="contenedorTareas">
        {tareas.map((t) => (
          <div key={t.id} className="tarea-item">{t.texto}</div>
        ))}
      </div>

      <p id='footer'>TO-DO Nai</p>
    </div>
  );
}

export default ListaTareas;
