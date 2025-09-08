async function postTareas(tarea) {
   try {
      const response = await fetch("http://localhost:3001/tareas", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(tarea)
      });

      const tareaPosteada= await response.json();
      return tareaPosteada;

   } catch (error) {
      console.error("Hay un error al registrar la tarea", error);
      throw error;
   }
}

async function getTareas() {
   try {
      const response = await fetch("http://localhost:3001/tareas", {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         },
     
      });

      const tareas = await response.json();
      return tareas;

   } catch (error) {
      console.error("Hay un error al registrar la tarea", error);
      throw error;
   }
}
async function deleteTareas(id) {
    try {
        const response = await fetch("http://localhost:3001/tarea/" + id,{

       method:"DELETE",
       headers:{
        "Content-Type": "application/json"
        }
     })
     const tareaElimanada = await response.json() 
     return tareaElimanada
        
    } catch (error) {
     console.error("hay un error al eliminar las tareas", error)
     throw error
     
    }
}




async function patchTareas(id, tareaEditada) {
    try {
        const response = await fetch("http://localhost:3001/tarea/" + id,{

       method:"PATCH",
       headers:{
        "Content-Type": "application/json",
        },
        body:JSON.stringify(productoEditado)
     })
     const tareaEditada= await response.json() 
     return tareaEditada
        
    } catch (error) {
     console.error("hay un error al editar las tareas", error)
     throw error
     
    }
}




export default { getTareas, postTareas, patchTareas, deleteTareas}