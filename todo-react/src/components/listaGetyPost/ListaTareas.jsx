import { useState, useEffect } from "react";
import { getTareas, deleteTareas, patchTareas } from "../../services/servicios";
import "./listaTareas.css";
import TareaInput from "../tareainput/TareaInput";
import Tarea from "../tarea/Tarea";

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const todasTareas = await getTareas();

        // Obtener usuario logueado
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

        // Filtrar solo las tareas de este usuario
        const tareasUsuario = todasTareas.filter(
          (t) => usuarioLogueado && t.usuarioId === usuarioLogueado.id
        );

        const tareasConCompletada = tareasUsuario.map((t) => ({
          ...t,
          completada: t.completada ?? false,
        }));

        setTareas(tareasConCompletada);
      } catch (error) {
        console.error("Error al traer las tareas", error);
      }
    };
    fetchTareas();
  }, []);

  const mostrarError = (mensaje) => {
    setMensajeError(mensaje);
    setIsModalErrorOpen(true);
  };

  const eliminarTarea = async (id) => {
    try {
      await deleteTareas(id);
      setTareas(tareas.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };

  const toggleCompletada = async (id, estadoActual) => {
    try {
      const nuevasTareas = tareas.map((t) =>
        t.id === id ? { ...t, completada: !estadoActual } : t
      );
      setTareas(nuevasTareas);

      const tareaActualizada = nuevasTareas.find((t) => t.id === id);
      await patchTareas(id, tareaActualizada);
    } catch (error) {
      console.error("Error al actualizar la tarea completada", error);
    }
  };

  return (
    <div>
      <p id="footer">TO-DO Nai</p>

      <h1>Tareas por completar</h1>
      <p id="contador">
        Total de tareas completadas: {tareas.filter((t) => t.completada).length}
      </p>

      <TareaInput
        tareas={tareas}
        setTareas={setTareas}
        mostrarError={mostrarError}
      />

      <div id="contenedorTareasPendientes">
        <h2>Tareas pendientes</h2>
        {tareas
          .filter((t) => !t.completada)
          .map((t) => (
            <Tarea
              key={t.id}
              tarea={t}
              onEliminar={eliminarTarea}
              onToggleCompletada={toggleCompletada}
            />
          ))}
      </div>

      <div id="contenedorTareasCompletadas">
        <h2>Tareas completadas</h2>
        {tareas
          .filter((t) => t.completada)
          .map((t) => (
            <Tarea
              key={t.id}
              tarea={t}
              onEliminar={eliminarTarea}
              onToggleCompletada={toggleCompletada}
            />
          ))}
      </div>

      {isModalErrorOpen && (
        <div className="modal-overlay" onClick={() => setIsModalErrorOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Error</h2>
            <p>{mensajeError}</p>
            <div className="modal-actions">
              <button onClick={() => setIsModalErrorOpen(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      <p id="footer">TO-DO Nai</p>
    </div>
  );
}

export default ListaTareas;
