import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalEditar from "../modal/ModalEditar";
import { patchTareas } from "../../services/servicios";

function Tarea({ tarea, onEliminar, onToggleCompletada }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarea.texto);

  const [alertModal, setAlertModal] = useState(false); // modal tipo alert

  const guardarEdicion = async () => {
    if (textoEditado.trim() === "") return;
    try {
      const tareaActualizada = { ...tarea, texto: textoEditado.trim() };
      await patchTareas(tarea.id, tareaActualizada);
      setIsModalOpen(false);
      tarea.texto = textoEditado.trim();
    } catch (error) {
      console.error("Error al editar la tarea", error);
    }
  };

  const handleEliminar = () => {
    setAlertModal(true); // abrir modal tipo alert
  };

  const confirmarEliminar = () => {
    onEliminar(tarea.id);
    setAlertModal(false);
  };

  return (
    <div className="tarea-item">
      {/* Checkbox */}
      <div
        className={`custom-checkbox ${tarea.completada ? "checked" : ""}`}
        onClick={() => onToggleCompletada(tarea.id, tarea.completada)}
      >
        {tarea.completada && <span className="checkmark">✓</span>}
      </div>

      {/* Texto */}
      <span className={tarea.completada ? "tarea-texto completada" : "tarea-texto"}>
        {tarea.texto}
      </span>

      {/* Botones */}
      <div className="acciones">
        <button className="btn-editar" onClick={() => setIsModalOpen(true)}>
          <FaEdit />
        </button>
        <button className="btn-eliminar" onClick={handleEliminar}>
          <FaTrash />
        </button>
      </div>

      {/* Modal de edición */}
      <ModalEditar
        isOpen={isModalOpen}
        textoEditado={textoEditado}
        setTextoEditado={setTextoEditado}
        onGuardar={guardarEdicion}
        onCerrar={() => setIsModalOpen(false)}
      />

      {/* Modal tipo alerta */}
      {alertModal && (
        <div className="alert-backdrop">
          <div className="alert-modal">
            <p>¿Está seguro de eliminar "{tarea.texto}"?</p>
            <div className="alert-buttons">
              <button className="btn-confirmar" onClick={confirmarEliminar}>Sí</button>
              <button className="btn-cancelar" onClick={() => setAlertModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Tarea;






