// src/components/tareainput/TareaInput.jsx
import { useState } from "react";
import { postTareas } from "../../services/servicios";
import "./tareaInput.css";

function TareaInput({ tareas, setTareas, mostrarError }) {
  const [tareaInput, setTareaInput] = useState("");

  const agregarTarea = async () => {
    if (tareaInput.trim() === "") {
      mostrarError("No se puede guardar una tarea vacía");
      return;
    }

    // Obtener usuario logueado
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
      mostrarError("No se encontró el usuario logueado");
      return;
    }

    const nuevaTarea = {
      texto: tareaInput.trim(),
      completada: false,
      usuarioId: usuarioLogueado.id, // Asociamos la tarea al usuario
    };

    try {
      const tareaCreada = await postTareas(nuevaTarea);
      setTareas([...tareas, tareaCreada]); // Agregamos la tarea al estado
      setTareaInput(""); // Limpiamos input
    } catch (error) {
      console.error("Error al agregar la tarea", error);
      mostrarError("Error al agregar la tarea");
    }
  };

  const manejarEnter = (e) => {
    if (e.key === "Enter") agregarTarea();
  };

  return (
    <div className="tarea-input">
      <input
        type="text"
        placeholder="Ingrese una Tarea"
        value={tareaInput}
        onChange={(e) => setTareaInput(e.target.value)}
        onKeyDown={manejarEnter}
      />
      <button onClick={agregarTarea}>Agregar</button>
    </div>
  );
}

export default TareaInput;





