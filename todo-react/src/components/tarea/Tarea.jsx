import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalEditar from "../modal/ModalEditar";
import { patchTareas } from "../../services/servicios"; // ✅ import correcto

function Tarea({ tarea, onEliminar, onToggleCompletada }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarea.texto);

  // Guardar edición
  const guardarEdicion = async () => {
    if (textoEditado.trim() === "") return;
    try {
      const tareaActualizada = { ...tarea, texto: textoEditado.trim() };
      await patchTareas(tarea.id, tareaActualizada); // ✅ llamada directa
      setIsModalOpen(false);
      tarea.texto = textoEditado.trim(); // actualiza localmente
    } catch (error) {
      console.error("Error al editar la tarea", error);
    }
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
        <button className="btn-eliminar" onClick={() => onEliminar(tarea.id)}>
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
    </div>
  );
}

export default Tarea;





