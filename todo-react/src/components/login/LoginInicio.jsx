import { useState, useEffect } from "react";
import { postUsuarios, getUsuarios, findUser, updatePassword } from "../../services/servicios";
import "./login.css";

export default function AuthPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
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

  // Login manual
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
    <main className="login-page">
      {/* Lado izquierdo */}
      <section className="left">
        <header className="brand">
          <div className="logo"></div>
          <div className="brand-name">TO-DoNaiReact</div>
        </header>

        <div className="form-wrap">
          {isLogin ? (
            <div className="login-form">
              <h1>Bienvenido</h1>
              <p className="sub">Ingrese sus datos</p>

              <label>
                <span className="label-text">Usuario:</span>
                <input
                  value={nombreI}
                  onChange={(e) => setNombreI(e.target.value)}
                  placeholder="Tu nombre de Usuario"
                />
              </label>

              <label>
                <span className="label-text">Contraseña:</span>
                <input
                  type="password"
                  value={contraseñaI}
                  onChange={(e) => setContraseñaI(e.target.value)}
                  placeholder="Introduce una contraseña"
                />
              </label>

              <div className="checkbox-group">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recordar 30 días</label>
              </div>

              <span className="forgot" onClick={() => setShowFindUser(true)}>
                Olvidé mi contraseña
              </span>

              <button className="btn primary" onClick={handleLogin}>
                Iniciar Sesión
              </button>
              <p>{mensajeLogin}</p>

              <p className="small muted">
                ¿No tienes cuenta?{" "}
                <span className="link" onClick={() => setIsLogin(false)}>
                  Regístrate
                </span>
              </p>
            </div>
          ) : (
            <div className="registro-form">
              <h1>Registro</h1>
              <p className="sub">Crea tu cuenta</p>

              <label>
                <span className="label-text">Nombre</span>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Introduce tu Usuario "
                />
              </label>

              <label>
                <span className="label-text">Correo</span>
                <input
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@email.com"
                />
              </label>

              <label>
                <span className="label-text">Contraseña</span>
                <input
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="Introduce tu Contraseña"
                />
              </label>

              <button className="btn primary" onClick={handleRegistro}>
                Registrar
              </button>
              <p>{mensajeRegistro}</p>

              <p className="small muted">
                ¿Ya tienes cuenta?{" "}
                <span className="link" onClick={() => setIsLogin(true)}>
                  Inicia sesión
                </span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lado derecho */}
      <aside className="right">
        <div className="illustration" aria-hidden="true"></div>
      </aside>

      {/* Modal recuperación */}
      {showFindUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Buscar usuario</h2>
            <input
              placeholder="Nombre o correo"
              value={inputUser}
              onChange={(e) => setInputUser(e.target.value)}
            />
            <button onClick={handleFindUser}>Buscar</button>
            <button onClick={() => setShowFindUser(false)}>Cerrar</button>
            <p>{message}</p>
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cambiar contraseña</h2>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Guardar</button>
            <button onClick={() => setShowChangePassword(false)}>Cerrar</button>
            <p>{changePasswordMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
}






