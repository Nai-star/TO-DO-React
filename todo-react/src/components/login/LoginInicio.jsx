import { useState, useEffect } from "react";
import { postUsuarios, getUsuarios, findUser, updatePassword } from "../../services/servicios";
import "./login.css";

export default function AuthPage() {
  // -------- Estados --------
  const [usuarios, setUsuarios] = useState([]);

  // Alternar entre login/registro
  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [nombreI, setNombreI] = useState("");
  const [contraseñaI, setContraseñaI] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");

  // Registro
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  // Recuperación de contraseña
  const [showFindUser, setShowFindUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [inputUser, setInputUser] = useState("");
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState("");

  // -------- useEffect --------
  useEffect(() => {
    const fetchUsuarios = async () => {
      const res = await getUsuarios();
      setUsuarios(res);
    };
    fetchUsuarios();
  }, []);

  // -------- Funciones --------
  const mostrarMensaje = (setMensaje, texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 4000);
  };

  // Login
  const handleLogin = () => {
    if (!nombreI || !contraseñaI) {
      mostrarMensaje(setMensajeLogin, "⚠️ Complete todos los campos");
      return;
    }

    const usuario = usuarios.find(
      (u) => u.nombre === nombreI && u.contraseña === contraseñaI
    );

    if (usuario) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      mostrarMensaje(setMensajeLogin, "✅ Bienvenido " + usuario.nombre);

      // Redirigir siempre a /lista
      setTimeout(() => {
        window.location.href = "/lista";
      }, 1000);

    } else {
      mostrarMensaje(setMensajeLogin, "❌ Usuario o contraseña incorrectos");
    }
  };

  // Registro
  const handleRegistro = async () => {
    try {
      if (!nombre || !correo || !contraseña) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Complete todos los campos");
        return;
      }

      const nombreExiste = usuarios.some((u) => u.nombre === nombre);
      const correoExiste = usuarios.some((u) => u.correo === correo);
      if (nombreExiste) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Nombre ya registrado");
        return;
      }
      if (correoExiste) {
        mostrarMensaje(setMensajeRegistro, "⚠️ Correo ya registrado");
        return;
      }

      const nuevoUsuario = { id: Date.now(), nombre, correo, contraseña };
      await postUsuarios(nuevoUsuario);
      setUsuarios([...usuarios, nuevoUsuario]);
      mostrarMensaje(setMensajeRegistro, "✅ Registro exitoso");

      // Limpiar campos
      setNombre("");
      setCorreo("");
      setContraseña("");
    } catch (error) {
      console.error(error);
      mostrarMensaje(setMensajeRegistro, "❌ Error al registrar");
    }
  };

  // Recuperación de contraseña
  const handleFindUser = async () => {
    if (!inputUser) return setMessage("Ingrese un valor");
    const user = await findUser(inputUser);
    if (user) {
      setUserToUpdate(user);
      setMessage("Usuario encontrado");
      setShowFindUser(false);
      setShowChangePassword(true);
      setNewPassword("");
      setConfirmPassword("");
      setChangePasswordMessage("");
    } else setMessage("Usuario no encontrado");
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setChangePasswordMessage("Complete ambos campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePasswordMessage("Las contraseñas no coinciden");
      return;
    }
    await updatePassword(userToUpdate.id, { contraseña: newPassword });
    setChangePasswordMessage("Contraseña actualizada con éxito");
    setTimeout(() => setShowChangePassword(false), 2000);
  };

  // -------- Render --------
  return (
    <div className="auth-page">
      {/* -------- LOGIN / REGISTRO -------- */}
      {isLogin ? (
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <input placeholder="Nombre" value={nombreI} onChange={e => setNombreI(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={contraseñaI} onChange={e => setContraseñaI(e.target.value)} />
          <button onClick={handleLogin}>Iniciar Sesión</button>
          <p>{mensajeLogin}</p>
          <p style={{ cursor: "pointer" }} onClick={() => setIsLogin(false)}>¿No tienes cuenta? Regístrate</p>
          <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setShowFindUser(true)}>Olvidé mi contraseña</p>
        </div>
      ) : (
        <div className="registro-form">
          <h2>Registro</h2>
          <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} />
          <button onClick={handleRegistro}>Registrar</button>
          <p>{mensajeRegistro}</p>
          <p style={{ cursor: "pointer" }} onClick={() => setIsLogin(true)}>¿Ya tienes cuenta? Inicia sesión</p>
        </div>
      )}

      {/* -------- MODAL RECUPERACIÓN -------- */}
      {showFindUser && (
        <div className="modal">
          <h2>Buscar usuario</h2>
          <input placeholder="Nombre o correo" value={inputUser} onChange={e => setInputUser(e.target.value)} />
          <button onClick={handleFindUser}>Buscar</button>
          <button onClick={() => setShowFindUser(false)}>Cerrar</button>
          <p>{message}</p>
        </div>
      )}

      {showChangePassword && (
        <div className="modal">
          <h2>Cambiar contraseña</h2>
          <input type="password" placeholder="Nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <button onClick={handleChangePassword}>Guardar</button>
          <button onClick={() => setShowChangePassword(false)}>Cerrar</button>
          <p>{changePasswordMessage}</p>
        </div>
      )}
    </div>
  );
}


