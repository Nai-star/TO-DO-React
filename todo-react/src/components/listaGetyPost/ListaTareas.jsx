import { useState, useEffect } from "react";
import servicios from "../../services/servicios";
import "./listaTareas.css";
import TareaInput from "../tareainput/TareaInput";
import Tarea from "../tarea/Tarea";
import ModalEditar from "../modal/ModalEditar";
import { createPortal } from "react-dom";

function ListaTareas() {
  const [tareaInput, setTareaInput] = useState("");
  const [tareas, setTareas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  // Modal de error
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const tareasTraidas = await servicios.getTareas();
        const tareasConCompletada = tareasTraidas.map((t) => ({
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

  const agregarTarea = async () => {
    if (tareaInput.trim() === "") {
      mostrarError("No se puede guardar una tarea vacía");
      return;
    }
    const nuevaTarea = { texto: tareaInput.trim(), completada: false };
    try {
      const tareaCreada = await servicios.postTareas(nuevaTarea);
      setTareas([...tareas, tareaCreada]);
      setTareaInput("");
    } catch (error) {
      console.error("Error al agregar la tarea", error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await servicios.deleteTareas(id);
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

      // Actualizamos en backend
      const tareaActualizada = nuevasTareas.find((t) => t.id === id);
      await servicios.patchTareas(id, tareaActualizada);
    } catch (error) {
      console.error("Error al actualizar la tarea completada", error);
    }
  };

  const abrirModal = (tarea) => {
    setTareaSeleccionada(tarea);
    setTextoEditado(tarea.texto);
    setIsModalOpen(true);
  };

  const guardarEdicion = async () => {
    if (textoEditado.trim() === "") {
      mostrarError("No se puede guardar una tarea vacía");
      return;
    }
    try {
      const tareaActualizada = { ...tareaSeleccionada, texto: textoEditado.trim() };
      await servicios.patchTareas(tareaSeleccionada.id, tareaActualizada);
      setTareas(
        tareas.map((t) => (t.id === tareaSeleccionada.id ? tareaActualizada : t))
      );
      setIsModalOpen(false);
      setTareaSeleccionada(null);
      setTextoEditado("");
    } catch (error) {
      console.error("Error al editar la tarea", error);
    }
  };

  // Maneja Enter en input
  const manejarEnter = (e) => {
    if (e.key === "Enter") agregarTarea();
  };

  return (
    <div>
      <p id="footer">TO-DO Nai</p>

      <h1>Tareas por completar</h1>
      <p id="contador">
        Total de tareas completadas: {tareas.filter((t) => t.completada).length}
      </p>

      {/* Input para agregar tarea */}
      <TareaInput
        tareaInput={tareaInput}
        setTareaInput={setTareaInput}
        onAgregar={agregarTarea}
        manejarEnter={manejarEnter}
      />

      {/* Contenedor de tareas pendientes */}
      <div id="contenedorTareasPendientes">
        <h2>Tareas pendientes</h2>
        {tareas
          .filter((t) => !t.completada)
          .map((t) => (
            <Tarea
              key={t.id}
              tarea={t}
              onEditar={abrirModal}
              onEliminar={eliminarTarea}
              onToggleCompletada={toggleCompletada}
            />
          ))}
      </div>

      {/* Contenedor de tareas completadas */}
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

      {/* Modal de edición */}
      <ModalEditar
        isOpen={isModalOpen}
        textoEditado={textoEditado}
        setTextoEditado={setTextoEditado}
        onGuardar={guardarEdicion}
        onCerrar={() => setIsModalOpen(false)}
      />

      {isModalErrorOpen &&
  createPortal(
    <div className="modal-overlay" onClick={() => setIsModalErrorOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Error</h2>
        <p>{mensajeError}</p>
        <div className="modal-actions">
          <button onClick={() => setIsModalErrorOpen(false)}>Cerrar</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
 <p id="footer">TO-DO Nai</p>
    </div>
  );
}

export default ListaTareas;



