import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./modalEditar.css";

function ModalEditar({ isOpen, textoEditado, setTextoEditado, onGuardar, onCerrar }) {
  if (!isOpen) return null;

  // Cierra con ESC y bloquea scroll
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onCerrar]);

  // Evitar que el clic dentro cierre el modal
  const stop = (e) => e.stopPropagation();

  return createPortal(
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-card" onClick={stop}>
        <h2>Editar Tarea</h2>
        <input type="text" value={textoEditado} onChange={(e) => setTextoEditado(e.target.value)}  placeholder="Escribe la nueva tarea"/>
        <div className="modal-actions">
          <button onClick={onGuardar}>Guardar</button>
          <button onClick={onCerrar}>Cancelar</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalEditar;

