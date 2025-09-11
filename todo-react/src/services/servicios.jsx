// ----------------- USUARIOS -----------------
export async function postUsuarios(usuario) {
   try {
      const response = await fetch("http://localhost:3001/usuarios", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(usuario)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al registrar el usuario", error);
      throw error;
   }
}

export async function getUsuarios() {
   try {
      const response = await fetch("http://localhost:3001/usuarios");
      if (!response.ok) throw new Error("Error al obtener usuarios");
      return await response.json();
   } catch (error) {
      console.error("Error al obtener los usuarios", error);
      throw error;
   }
}

export async function findUser(identifier) {
   try {
      const response = await fetch("http://localhost:3001/usuarios");
      if (!response.ok) throw new Error("Error en la solicitud de búsqueda de usuario");
      const users = await response.json();
      return users.find(u => u.nombre === identifier || u.correo === identifier) || null;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function updatePassword(userId, newPassword) {
   try {
      const response = await fetch(`http://localhost:3001/usuarios/${userId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ contraseña: newPassword })
      });
      return await response.json();
   } catch (error) {
      console.error(error);
      throw error;
   }
}

// ----------------- TAREAS -----------------
export async function postTareas(tarea) {
   try {
      const response = await fetch("http://localhost:3001/tareas", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(tarea)
      });
      return await response.json();
   } catch (error) {
      console.error("Error al registrar la tarea", error);
      throw error;
   }
}

export async function getTareas() {
   try {
      const response = await fetch("http://localhost:3001/tareas");
      if (!response.ok) throw new Error("Error al obtener tareas");
      return await response.json();
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function deleteTareas(id) {
   try {
      const response = await fetch(`http://localhost:3001/tareas/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar la tarea");
      return true;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

export async function patchTareas(id, tareaEditada) {
   try {
      const response = await fetch(`http://localhost:3001/tareas/${id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(tareaEditada)
      });
      return await response.json();
   } catch (error) {
      console.error(error);
      throw error;
   }
}
