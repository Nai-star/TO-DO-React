import { FaEdit, FaTrash } from "react-icons/fa";

function Tarea({ tarea, onEditar, onEliminar, onToggleCompletada }) {
  if (!tarea) return null;

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

      {/* Botones existentes */}
      <div className="acciones">
        <button className="btn-editar" onClick={() => onEditar(tarea)}>
          <FaEdit />
        </button>
        <button className="btn-eliminar" onClick={() => onEliminar(tarea.id)}>
          <FaTrash /> 
        </button>
      </div>
    </div>
  );
}

export default Tarea;



