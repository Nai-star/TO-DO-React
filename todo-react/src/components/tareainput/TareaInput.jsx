
import "./tareaInput.css";

function TareaInput({ tareaInput, setTareaInput, onAgregar, manejarEnter }) {
  return (
    <div className="tarea-input">
      <input
        type="text"
        placeholder="Ingrese una Tarea"
        value={tareaInput}
        onChange={(e) => setTareaInput(e.target.value)}
        onKeyDown={manejarEnter} // ahora lo recibe de las props
      />
      <button onClick={onAgregar}>Agregar</button>
    </div>
  );
}

export default TareaInput;


