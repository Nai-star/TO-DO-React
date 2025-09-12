import { useState } from "react";
import { postTareas } from "../../services/servicios";
import "./tareaInput.css";

function TareaInput({ tareas, setTareas, mostrarError }) {
  const [tareaInput, setTareaInput] = useState("");
  const [fecha, setFecha] = useState("");

  // Obtener la fecha de hoy en formato YYYY-MM-DD
  const hoy = new Date().toISOString().split("T")[0];

  const agregarTarea = async () => {
    if (tareaInput.trim() === "") {
      mostrarError("No se puede guardar una tarea vacía");
      return;
    }

    // Validar que la fecha sea exactamente hoy
    if (fecha.split("T")[0] !== hoy) {
      mostrarError("La fecha debe ser la de hoy");
      return;
    }

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
      mostrarError("No se encontró el usuario logueado");
      return;
    }

    const nuevaTarea = {
      texto: tareaInput.trim(),
      completada: false,
      fecha: fecha || null,
      usuarioId: usuarioLogueado.id,
    };

    try {
      const tareaCreada = await postTareas(nuevaTarea);
      setTareas([...tareas, tareaCreada]);
      setTareaInput("");
      setFecha("");
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

      {/* Input con restricción solo a HOY */}
      <input
        type="date"
        value={fecha.split("T")[0]}
        min={hoy}
        max={hoy}
        onChange={(e) => setFecha(e.target.value)}
      />
    </div>
  );
}

export default TareaInput;






